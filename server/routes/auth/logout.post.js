import defineAuthenticatedEventHandler from "~~/server/utils/defineAuthenticatedEventHandler";

export default defineAuthenticatedEventHandler(async (event) => {
  const config = useRuntimeConfig();

  deleteCookie(event, config.COOKIE_NAME, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: true,
  });

  return { user: null };
});
