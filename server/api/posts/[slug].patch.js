import Post from "../../models/post";
import { readFiles } from "h3-formidable";
import slugify from "slugify";
import defineAuthenticatedEventHandler from "~~/server/utils/defineAuthenticatedEventHandler";
import { uploadImage, deleteImage } from "../../utils/cloudinary";

export default defineAuthenticatedEventHandler(async (event) => {
  let featured_image;
  const slug = event.context.params.slug;
  const post = await Post.findOne({ slug });

  try {
    const { fields, files } = await readFiles(event, {
      includeFields: true,
    });

    const formatedFields = Object.keys(fields).reduce((obj, key) => {
      return { ...obj, [key]: fields[key][0] };
    }, {});

    event.context.body = { ...formatedFields };

    if (formatedFields.tags) {
      event.context.body.tags = formatedFields.tags.split(",");
    }

    // delete old featured image and upload new one

    if (Object.keys(files).length >= 1) {
      await deleteImage(post.featured_image.public_id);
      featured_image = await uploadImage(files.featured_image[0].filepath);

      if (!featured_image) {
        throw creatError({
          statusCode: 500,
          statusMessage: "Image uploading failed.",
        });
      }

      event.context.body.featured_image = {
        url: featured_image.secure_url,
        srcset: featured_image.responsive_breakpoints[0].breakpoints,
        public_id: featured_image.public_id,
      };
    }

    if (formatedFields.title) {
      event.context.body.slug = slugify(formatedFields.title);
    }

    const updated_post = await Post.findOneAndUpdate(
      { slug: event.context.params.slug },
      { $set: event.context.body },
      { new: true }
    )
      .populate("author", "firstname lastname")
      .populate("tags", "name _id");

    return updated_post;
  } catch (error) {
    // delete uploaded image if post update fails

    if (featured_image) {
      await deleteImage(featured_image.public_id);
    }

    throw createError({
      statusCode: 400,
      statusMessage: "Post update failed.",
    });
  }
});
