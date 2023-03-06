import mongoose from "mongoose";

const config = useRuntimeConfig();

export default defineNitroPlugin(async (nitroApp) => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(config.MONGODB_URI);
    console.log("DB connection established.");
  } catch (err) {
    console.error("DB connection failed.", err);
  }
});
