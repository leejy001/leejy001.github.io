import express from "express";
// Model
import Post from "../../models/post.js";
import User from "../../models/user.js";
import Category from "../../models/category.js";
import Comment from "../../models/comment.js";
import auth from "../../middleware/auth.js";
import "@babel/polyfill";
const router = express.Router();

import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import { isNullOrUndefined } from "util";
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: "lab207blog/upload",
    region: "ap-northeast-2",
    key(req, file, cb) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});

// @routes  Post api/post/image
// @desc    Create a Post
// @access  Private
router.post("/image", uploadS3.array("upload", 15), async (req, res, next) => {
  try {
    console.log(req.files.map((v) => v.location));
    res.json({ uploaded: true, url: req.files.map((v) => v.location) });
  } catch (e) {
    console.error(e);
    res.json({ uploaded: false, url: null });
  }
});

// @routes  Get api/post
// @desc    More Loading Posts
// @access  Public
router.get("/skip/:skip", async (req, res) => {
  try {
    const postCount = await Post.countDocuments();
    const postFindResult = await Post.find()
      .skip(Number(req.params.skip))
      .limit(6)
      .sort({ date: -1 });
    const categoryFindResult = await Category.find();
    const result = { postCount, postFindResult, categoryFindResult };
    res.json(result);
  } catch (e) {
    console.log(e);
    res.json({ msg: "더 이상 포스트가 없습니다" });
  }
});

// @routes  Post api/post
// @desc    Create a Post
// @access  Private
router.post("/", auth, uploadS3.none(), async (req, res, next) => {
  try {
    console.log("req", req);
    const { title, contents, fileUrl, creator, category } = req.body;
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      creator: req.user.id,
      date: new Date(),
    });

    const findResult = await Category.findOne({
      categoryName: category,
    });

    console.log(findResult, "findResult");

    if (isNullOrUndefined(findResult)) {
      const newCategory = await Category.create({
        categoryName: category,
      });
      await Post.findByIdAndUpdate(newPost._id, {
        $push: { category: newCategory._id },
      });
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: { posts: newPost._id },
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: { posts: newPost._id },
      });
    } else {
      await Category.findByIdAndUpdate(findResult._id, {
        $push: { posts: newPost._id },
      });
      await Post.findByIdAndUpdate(newPost._id, {
        category: findResult._id,
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: { posts: newPost._id },
      });
    }
    return res.redirect(`/api/post/${newPost._id}`);
  } catch (e) {
    console.log(e);
  }
});

// @routes  Post api/post/:id
// @desc    Detail post
// @access  Public

router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("creator", "name")
      .populate({ path: "category", select: "categoryName" });
    post.views += 1;
    post.save();
    console.log(post);
    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// @routes  get api/post/:id
// @desc    Delete Post
// @access  Private

router.delete("/:id", auth, async (req, res) => {
  await Post.deleteMany({ _id: req.params.id });
  await Comment.deleteMany({ post: req.params.id });
  await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      posts: req.params.id,
      comments: { post_id: req.params.id },
    },
  });
  const CategoryUpdateResult = await Category.findOneAndUpdate(
    { posts: req.params.id },
    { $pull: { posts: req.params.id } },
    { new: true }
  );

  if (CategoryUpdateResult.posts.length === 0) {
    await Category.deleteMany({ _id: CategoryUpdateResult });
  }
  return res.json({ success: true });
});

// @routes  get api/post/:id/edit
// @desc    Edit Post
// @access  Private

router.post("/:id/edit", auth, async (req, res, next) => {
  console.log(req, "api/post/:id/edit");
  const {
    body: { title, contents, fileUrl, id },
  } = req;

  try {
    const modified_post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        contents,
        fileUrl,
        date: new Date(),
      },
      { new: true } // new: true값을 줘야 업데이트 적용
    );
    console.log(modified_post, "edit modified");
    res.redirect(`/api/post/${modified_post.id}`);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Comments Route

// @routes  get api/get/:id/comments
// @desc    Get All Comments
// @access  Public

router.get("/:id/comments", async (req, res) => {
  try {
    const comment = await Post.findById(req.params.id).populate({
      path: "comments",
    });
    const result = comment.comments;
    console.log(result, "comment load");
    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

// @routes  api/post/:id/comments
// @desc    Create Comment
// @access  Private

router.post("/:id/comments", async (req, res, next) => {
  console.log(req, "comments");
  const newComment = await Comment.create({
    contents: req.body.contents,
    creator: req.body.userId,
    creatorName: req.body.userName,
    creatorImg: req.body.userImg,
    replyTo: req.body.replyTo,
    post: req.body.id,
    date: new Date(),
  });
  console.log(newComment, "newComment");
  try {
    await Post.findByIdAndUpdate(req.body.id, {
      $push: {
        comments: newComment._id,
      },
    });
    await User.findByIdAndUpdate(req.body.userId, {
      $push: {
        comments: {
          post_id: req.body.id,
          comment_id: newComment._id,
        },
      },
    });
    res.json(newComment);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// @routes  get api/post/:id/comments/:commentId/edit
// @desc    Edit Comment
// @access  Private

router.post("/:id/comments/:commentId/edit", auth, async (req, res, next) => {
  console.log(req.body, "/:id/comments/:commentId/edit");
  const contents = req.body.newContents;

  try {
    await Comment.findByIdAndUpdate(
      req.body.commentId,
      {
        contents,
      },
      { new: true } // new: true값을 줘야 업데이트 적용
    );
    const comment = await Post.findById(req.body.id).populate({
      path: "comments",
    });
    const result = comment.comments;
    return res.json(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// @routes  api/post/:id/comments/:commentId/
// @desc    Delete Comment
// @access  Private

router.delete("/:id/comments/:commentId/", auth, async (req, res) => {
  console.log(req.params);
  await Post.findByIdAndUpdate(req.params.id, {
    $pull: {
      comments: req.params.commentId,
    },
  });
  await Comment.deleteMany({ _id: req.params.commentId });
  await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      comments: { comment_id: req.params.commentId },
    },
  });
  const comment = await Post.findById(req.params.id).populate({
    path: "comments",
  });
  const result = comment.comments;
  return res.json(result);
});

// Category Search
router.get("/category/:categoryName", async (req, res, next) => {
  try {
    const result = await Category.findOne(
      {
        categoryName: {
          $regex: req.params.categoryName,
          $options: "i",
        },
      },
      "posts"
    ).populate({ path: "posts" });
    console.log(result, "Category Find Result");
    res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Category list
router.get("/:id/category", async (req, res, next) => {
  console.log(req.params.id, "req.body.id");
  try {
    const post = await Post.findById(req.params.id).populate("category");
    const result = await Category.findOne(
      {
        categoryName: {
          $regex: post.category.categoryName,
          $options: "i",
        },
      },
      "posts"
    ).populate({ path: "posts" });
    console.log(result, "Category Find Result");
    res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
