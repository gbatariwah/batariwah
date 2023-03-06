export default function (handler) {
  return defineEventHandler(async (event) => {
    if (event.context.user) {
      return handler(event);
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }
  });
}
