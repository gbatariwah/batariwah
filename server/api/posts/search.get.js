import Post from "../../models/post";

export default defineEventHandler(async (event) => {
  const { q, page } = getQuery(event);

  const limit = 4;

  const filter = {
    $or: [
      { title: { $regex: q.toLowerCase(), $options: "i" } },
      { content: { $regex: q.toLowerCase(), $options: "i" } },
    ],
  };

  const results = await Post.find(filter)
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit))
    .sort({ createdAt: -1 })
    .select("title featured_image createdAt slug");

  const count = await Post.countDocuments(filter);

  return {
    results,
    totalPages: Math.ceil(Number(count) / Number(limit)),
    currentPage: page,
  };
});
