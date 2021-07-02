import mongoose from "mongoose";

// create schema
const curTime = new Date();
const utc = curTime.getTime() + curTime.getTimezoneOffset() * 60 * 1000;
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  contents: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: -2,
  },
  fileUrl: {
    type: String,
    default: "none",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  date: {
    type: String,
    default: new Date(),
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Post = mongoose.model("post", PostSchema);

export default Post;
