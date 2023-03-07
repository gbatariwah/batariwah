import mongoose from "mongoose";
import User from "../models/user";
import Tag from "../models/tag";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    slug: { type: String, lowercase: true },
    content: String,
    featured_image: { url: String, srcset: Array, public_id: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: User },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: Tag }],
  },
  { timestamps: true }
);

postSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    if (error.message.includes("title_1 dup key")) {
      const error = new Error("A post with the same title already exist.");
      error.status = 400;
      throw createError({
        statusCode: error.status,
        statusMessage: error.message,
      });
    }
  } else next();
});

export default mongoose.model("post", postSchema);
