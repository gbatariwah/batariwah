import Tag from "../../models/tag";
import defineAuthenticatedEventHandler from "~~/server/utils/defineAuthenticatedEventHandler";

export default defineAuthenticatedEventHandler(async (event) => {
  const id = event.context.params.id;

  await Tag.findByIdAndDelete(id).exec();

  return { message: "Tag deleted" };
});
