export const useAuth = () => {
  const user = useState("user", () => null);

  const setUser = (currentUser) => {
    user.value = currentUser;
  };

  const login = async (email, password) => {
    const data = await $fetch("/auth/login", {
      method: "POST",
      body: { email, password },
    });

    setUser(data.user);
  };

  const logout = async () => {
    const data = await $fetch("/auth/logout", { method: "POST" });

    setUser(data.user);
    navigateTo("/");
  };

  const me = async () => {
    if (!user.value) {
      try {
        const data = await $fetch("/auth/me", {
          headers: useRequestHeaders(["cookie"]),
        });

        setUser(data.user);
      } catch (error) {
        setUser(null);
      }
    }

    return user;
  };

  return { user, login, logout, me };
};
