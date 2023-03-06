import Post from "../../models/post";
import defineAuthenticatedEventHandler from "~~/server/utils/defineAuthenticatedEventHandler";
import { deleteImage } from "../../utils/cloudinary";

export default defineAuthenticatedEventHandler(async (event) => {
  const slug = event.context.params.slug;

  const post = await Post.findOne({ slug });

  await deleteImage(post.featured_image.public_id);

  await post.deleteOne();

  return { message: "Post deleted" };
});
