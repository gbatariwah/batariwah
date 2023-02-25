import User from "../../models/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await User.findOne({ email: body.email });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "No account associated with this email",
    });
  }
  const validPassword = await user.validatePassword(body.password);

  if (!validPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password do not match",
    });
  }

  const token = user.generateToken();

  const { password, ...rest } = user.toObject();
  return { token, user: rest };
});
