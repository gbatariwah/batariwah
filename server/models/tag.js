import mongoose from "mongoose";
import User from "./user";
const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    slug: String,
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
  },
  { timestamps: true }
);

tagSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    if (error.message.includes("dup key")) {
      const error = new Error("Tag already exists.");
      error.status = 400;
      throw createError({
        statusCode: error.status,
        statusMessage: error.message,
      });
    }
  }
});

export default mongoose.model("tag", tagSchema);
