import type { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';

export const AuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.CLIENT_ID ?? '',
      clientSecret: process.env.CLIENT_SECRET ?? '',
      authorization: {params: {scope: 'read:user user:email repo issues:write'}}
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'github' && user.name === process.env.NEXT_PUBLIC_OWNER_NAME) {
        return true;
      }
      return false;
    },
    async jwt({ token, account}) {
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
      }
      return token
    },
    async session({ session, token, user }) {
      session.user.accessToken = token.accessToken as string;
      return session;
    },
  }
}
