import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    gender: String,
    admin: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_picture: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    phone_number: String,
    bio: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  let user = this;
  user.password = await bcrypt.hash(user.password, 10);
});

userSchema.methods.validatePassword = function (password) {
  let user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    if (error.message.includes("email_1 dup key")) {
      const error = new Error("Email already taken.");
      error.status = 400;
      return next(error);
    }
  } else next();
});
userSchema.methods.generateToken = function () {
  const config = useRuntimeConfig();
  return jwt.sign({ _id: this._id }, config.JWT_API_SECRET, {
    expiresIn: "1d",
  });
};

userSchema.methods.generateCookie = function (event) {
  let user = this;
  const config = useRuntimeConfig();
  const token = user.generateToken();

  setCookie(event, config.COOKIE_NAME, token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: false,
    maxAge: 86400,
  });
};

export default mongoose.model("user", userSchema);
