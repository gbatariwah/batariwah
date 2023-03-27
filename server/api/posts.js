import { createRouter, defineEventHandler, useBase } from "h3";
import Post from "../models/post";
import slugify from "slugify";
import { readFiles } from "h3-formidable";
import { uploadImage, deleteImage } from "../utils/cloudinary";
import defineAuthenticatedEventHandler from "../utils/defineAuthenticatedEventHandler";

const router = createRouter();

router
  .get(
    "/",
    defineEventHandler(async (event) => {
      const { limit, page } = getQuery(event);

      const p = parseInt(page);
      const l = parseInt(limit);

      const skip = p === 1 ? (p - 1) * l : (p - 1) * l + 4;

      //   execute query with page and limit values
      const posts = await Post.find()
        .select("title slug content featured_image createdAt")
        .sort({ createdAt: -1 })
        .limit(l)
        .skip(skip)
        .exec();

      // get total documents in the Posts collection
      const count = await Post.estimatedDocumentCount();

      // return response with posts, total pages, and current page

      return {
        posts,
        totalPosts: count,
      };
    })
  )
  .post(
    "/",
    defineAuthenticatedEventHandler(async (event) => {
      let featured_image;

      const { fields, files } = await readFiles(event, {
        includeFields: true,
      });

      const { title, content, tags } = Object.keys(fields).reduce(
        (obj, key) => {
          return { ...obj, [key]: fields[key][0] };
        },
        {}
      );

      event.context.body = { title, content, author: event.context.user._id };

      try {
        featured_image = await uploadImage(files.featured_image[0].filepath);

        event.context.body.featured_image = {
          url: featured_image.secure_url,
          srcset: featured_image.responsive_breakpoints[0].breakpoints,
          public_id: featured_image.public_id,
        };

        if (tags) {
          event.context.body.tags = tags.split(",");
        }
        event.context.body.slug = slugify(title.toLowerCase());

        const new_post = await new Post(event.context.body).populate(
          "author",
          "firstname lastname profile_picture bio"
        );
        //   .populate("tags");
        await new_post.save();

        return { post: new_post };
      } catch (error) {
        // deletes uploaded image if post creation fails
        if (featured_image) {
          await deleteImage(featured_image.public_id);
        }

        throw createError({
          statusCode: 400,
          statusMessage: error.message,
        });
      }
    })
  );

export default useBase("/api/posts", eventHandler(router.handler));
