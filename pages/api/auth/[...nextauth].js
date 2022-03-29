import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../utils/mongodb";
import { connectDb } from "../../../utils/db";
import User from "../../../schemas/User";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, user, token }) {
      return { ...session, user: { ...session.user, id: user.id } };
    },
    async signIn({ session }) {
      connectDb();
      const filter = { email: email };
      const update = { name: "rocco buttiglione" };
      let generateNickname = await User.findOneAndUpdate(filter, update);

      return true;
    },
  },
  pages: {
    signIn: "/signin/",
  },
});
