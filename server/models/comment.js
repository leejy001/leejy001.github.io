import mongoose from "mongoose";
// create schema

const CommentSchema = new mongoose.Schema({
  contents: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date(),
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  replyTo: {
    type: String,
    default: "none",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  creatorName: { type: String },
  creatorImg: {
    type: String,
  },
});

const Comment = mongoose.model("comment", CommentSchema);

export default Comment;
