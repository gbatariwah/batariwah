import { createRouter, useBase } from "h3";
import Tag from "../models/tag";
import defineAuthenticatedEventHandler from "../utils/defineAuthenticatedEventHandler";

const router = createRouter();

router
  .get(
    "/",
    defineAuthenticatedEventHandler(async (event) => {
      const tags = await Tag.find({});
      return { tags };
    })
  )
  .post(
    "/",
    defineAuthenticatedEventHandler(async (event) => {
      const { name } = await readBody(event);
      const tag = await Tag.create({ name, addedBy: event.context.user._id });
      return { tag };
    })
  );

export default useBase("/api/tags", eventHandler(router.handler));
