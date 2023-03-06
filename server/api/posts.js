import { createRouter, defineEventHandler, useBase } from "h3";
import Post from "../models/post";
import User from "../models/user";
import slugify from "slugify";
import { readFiles } from "h3-formidable";
import { uploadImage, deleteImage } from "../utils/cloudinary";
import defineAuthenticatedEventHandler from "../utils/defineAuthenticatedEventHandler";

const router = createRouter();

router
  .get(
    "/",
    defineEventHandler(async (event) => {
      const { page = 1, limit = 7 } = getQuery(event);

      //   execute query with page and limit values
      const posts = await Post.find()
        .select("title slug content featured_image createdAt")
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit))
        .exec();

      // get total documents in the Posts collection
      const count = await Post.estimatedDocumentCount();

      // return response with posts, total pages, and current page

      return {
        posts,
        totalPages: Math.ceil(Number(count) / Number(limit)),
        total: count,
        currentPage: page,
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

      const { title, content } = Object.keys(fields).reduce((obj, key) => {
        return { ...obj, [key]: fields[key][0] };
      }, {});

      event.context.body = { title, content, author: event.context.user._id };

      try {
        featured_image = await uploadImage(files.featured_image[0].filepath);

        event.context.body.featured_image = {
          url: featured_image.secure_url,
          srcset: featured_image.responsive_breakpoints[0].breakpoints,
          public_id: featured_image.public_id,
        };

        // if (files.tags) {
        //   tags = files.tags.split(",");
        // }
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
