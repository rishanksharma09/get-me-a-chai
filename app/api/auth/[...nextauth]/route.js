import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"


const handler = NextAuth({

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  debug: true,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github") {
        await connectDB()
        const existingUser = await User.findOne({ email: profile.email });
        if (!existingUser) {

          // User doesn't exist, create a new one
          const newUser = await User.create({
            email: profile.email,
            name: user.name || profile.name,
            username: profile.login
          });
        }
        return true;
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email })
        token.username = dbUser.username; // attach username from DB
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username; // pass it to session
      }
      return session;
    },
  }
});

export { handler as GET, handler as POST };

