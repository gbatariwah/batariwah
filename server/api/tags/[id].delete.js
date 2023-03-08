import Tag from "../../models/tag";
import Post from "../../models/post";
import defineAuthenticatedEventHandler from "~~/server/utils/defineAuthenticatedEventHandler";

export default defineAuthenticatedEventHandler(async (event) => {
  const id = event.context.params.id;

  await Tag.findByIdAndDelete(id).exec();

  await Post.updateMany({ $pull: { tags: id } });

  return { message: "Tag deleted" };
});
