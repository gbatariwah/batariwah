import mongoose from "mongoose";

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig();
  const dbUrl =
    config.ENV === "development" ? config.MONGODB_URI : config.MONGODB_URL;

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(dbUrl);
    if (config.ENV === "development") {
      console.log("DB connection established.");
    }
  } catch (err) {
    if (config.ENV === "development") {
      console.error("DB connection failed.", err);
    }
  }
});
