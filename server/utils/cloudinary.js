import cloudinary from "cloudinary";

const config = useRuntimeConfig();

const folder = config.ENV === "development" ? "batariwah_dev" : "batariwah";

cloudinary.v2.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export async function uploadImage(image) {
  return await cloudinary.v2.uploader.upload(image, {
    folder,
    format: "webp",
    responsive_breakpoints: {
      create_derived: true,
      bytes_step: 20000,
      format: "webp",
      min_width: 200,
      max_width: 1000,
      max_images: 4,
      transformation: {
        crop: "fill",
        aspect_ratio: "16:9",
        gravity: "auto",
      },
    },
  });
}

export async function deleteImage(public_id) {
  return cloudinary.v2.uploader.destroy(public_id);
}

export async function uploadProfileImage(image) {
  return cloudinary.v2.uploader.upload(image, {
    folder,
    format: "webp",
    // transformation: [
    //   // { gravity: "face", height: 400, width: 400, crop: "crop" },
    //   { height: 400, width: 400, crop: "crop" },
    // ],
  });
}
