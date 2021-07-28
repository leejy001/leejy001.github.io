import mongoose from "mongoose";

// create schema
const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    default: "미분류",
  },
  label: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

const Category = mongoose.model("category", CategorySchema);

export default Category;
