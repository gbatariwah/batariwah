// file: ~/server/api/auth/[...].ts
import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
const config = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: config.NUXT_SECRET,
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: "/login",
  },
  providers: [
    // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      }, // Object is required but can be left empty.
      async authorize(credentials) {
        try {
          const response = await $fetch(`/api/auth/login`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          return { email: response };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        const {
          user: {
            _id,
            firstname,
            lastname,
            email,
            admin,
            profile_picture,
            bio,
          },
          token: jwtToken,
        } = token.email;
        token.firstname = firstname;
        token.lastname = lastname;
        token.email = email;
        token.admin = admin;
        token.profile_picture = profile_picture;
        token.id = _id;
        token.bio = bio;
        token.jwt = jwtToken;
      }
      return token;
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.jwt = token.jwt;
      session.user = {
        firstname: token.firstname,
        lastname: token.lastname,
        email: token.email,
        admin: token.admin,
        profile_picture: token.profile_picture,
        id: token.id,
        bio: token.bio,
      };

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
