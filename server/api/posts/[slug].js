import Post from "../../models/post";

export default defineEventHandler(async (event) => {
  const slug = event.context.params.slug;

  const post = await Post.findOne({ slug }).populate(
    "author",
    "firstname lastname profile_picture bio"
  );
  // .populate("tags", "name slug color")
  // .populate("views", "total_views -_id");

  const suggestedPosts = await Post.aggregate([
    { $match: { slug: { $ne: slug } } },
    { $sample: { size: 2 } },
    {
      $project: {
        _id: 0,
        title: 1,
        slug: 1,
        createdAt: 1,
        featured_image: 1,
      },
    },
  ]);

  return { post, suggestedPosts };
});
