import Post from "../../models/post";
import defineAuthenticatedEventHandler from "~~/server/utils/defineAuthenticatedEventHandler";

export default defineAuthenticatedEventHandler(async (event) => {
  const { limit, page } = getQuery(event);

  const p = parseInt(page);
  const l = parseInt(limit);

  const skip = p === 1 ? (p - 1) * l : (p - 1) * l + 4;

  const filter = event.context.user.isAdmin
    ? {}
    : { author: event.context.user._id };

  const posts = await Post.find(filter)
    .sort({ createdAt: -1 })
    .limit(l)
    .skip(skip)
    .exec();

  const count = await Post.countDocuments(filter);

  return {
    posts,
    totalPosts: count,
  };
});
