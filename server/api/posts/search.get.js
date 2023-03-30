import Post from "../../models/post";

export default defineEventHandler(async (event) => {
  const { q, page, limit } = getQuery(event);

  const p = parseInt(page);
  const l = parseInt(limit);

  const skip = p === 1 ? (p - 1) * l : (p - 1) * l + 2;

  const filter = {
    $or: [
      { title: { $regex: q.toLowerCase(), $options: "i" } },
      { content: { $regex: q.toLowerCase(), $options: "i" } },
    ],
  };

  const results = await Post.find(filter)
    .limit(l)
    .skip(skip)
    .sort({ createdAt: -1 })
    .select("title featured_image createdAt slug");

  const count = await Post.countDocuments(filter);

  return {
    results,
    totalResults: count,
  };
});
