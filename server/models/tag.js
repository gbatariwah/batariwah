import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    slug: String,
    color: { type: String, default: "blue" },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

tagSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    if (error.message.includes("dup key")) {
      const error = new Error("Tag already exists.");
      error.status = 400;
      return next(error);
    }
  } else next();
});

export default mongoose.model("tag", tagSchema);
