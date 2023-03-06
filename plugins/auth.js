export default defineNuxtPlugin(async (NuxtApp) => {
  const { me } = useAuth();

  await me();
});
