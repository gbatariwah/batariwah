import User from "../../models/user";
import bcrypt from "bcrypt";
import { readFiles } from "h3-formidable";
import { uploadProfileImage, deleteImage } from "../../utils/cloudinary";
import defineAuthenticatedEventHandler from "~~/server/utils/defineAuthenticatedEventHandler";

export default defineAuthenticatedEventHandler(async (event) => {
  let profile_image;
  const id = event.context.params.id;
  const user = await User.findOne({ _id: id }).select("_id password");

  try {
    const { fields, files } = await readFiles(event, {
      includeFields: true,
    });

    const formatedFields = Object.keys(fields).reduce((obj, key) => {
      return { ...obj, [key]: fields[key][0] };
    }, {});

    event.context.body = { ...formatedFields };

    if (fields.password) {
      const validOldPassword = await user.validatePassword(
        fields.oldPassword,
        user.password
      );

      if (validOldPassword) {
        const newPassword = await bcrypt.hash(fields.password, 10);
        event.context.body.password = newPassword;
      } else throw new Error("Unauthorized");
    }

    if (Object.keys(files).length >= 1) {
      profile_image = await uploadProfileImage(files.profile_image[0].filepath);

      if (user.profile_picture.public_id) {
        await deleteImage(user.profile_image.public_id);
      }

      if (!profile_image) {
        throw createError({
          statusCode: 500,
          statusMessage: "Image uploading failed.",
        });
      }

      event.context.body.profile_picture = {
        url: profile_image.secure_url,
        public_id: profile_image.public_id,
      };
    }

    const updated_user = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: event.context.body,
      },
      { new: true }
    ).select("-password");

    return { user: updated_user };
  } catch (error) {
    if (profile_image) {
      await deleteImage(profile_image.public_id);
    }

    throw createError({
      statusCode: 400,
      statusMessage: "Profile update failed.",
    });
  }
});
