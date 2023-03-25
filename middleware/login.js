export default defineNuxtRouteMiddleware((_to, _from) => {
  const { user } = useAuth();

  if (_to.name === "login" && user.value) {
    return navigateTo("/");
  }
});
