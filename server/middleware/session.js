import jwt from "jsonwebtoken";
import User from "../models/user";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const cookie = getCookie(event, config.COOKIE_NAME);
    if (cookie) {
      const { _id } = await jwt.verify(cookie, config.JWT_API_SECRET);

      if (_id) {
        const user = await User.findById(_id);
        const { password, ...rest } = user.toObject();
        event.context.user = rest;
      }
    }
  } catch (error) {}
});
