import Post from "../../models/post";
import defineAuthenticatedEventHandler from "~~/server/utils/defineAuthenticatedEventHandler";

export default defineAuthenticatedEventHandler(async (event) => {
  const { page = 1, limit = 6 } = getQuery(event);

  const filter = event.context.user.isAdmin
    ? {}
    : { author: event.context.user._id };

  const posts = await Post.find(filter)
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit))
    .exec();

  const count = await Post.countDocuments(filter);

  return {
    posts,
    totalPages: Math.ceil(Number(count) / Number(limit)),
    currentPage: page,
  };
});
