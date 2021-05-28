import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { authOperation } from "../lib/api/auth";

export default NextAuth({
  session: {
    jwt: true
  },

  providers: [
    Providers.Credentials({
      async authorize(credentials: Record<"email" | "password", string>, req) {
        try {
          return await authOperation(credentials);
        } catch (error) {
          throw error;
        }
      }
    })
  ],

  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      if (user) {
        token.id = user.id;
      }
      return Promise.resolve(token);
    },

    session: async (session, user) => {
      session.userId = user.id as string;
      return Promise.resolve(session);
    }
  }
});
