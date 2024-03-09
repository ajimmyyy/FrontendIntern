import type { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';

export const AuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.CLIENT_ID ?? '',
      clientSecret: process.env.CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'github' && user.id === process.env.OWNER_ID) {
        return true;
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/user`;
    },
    async jwt({ token, account}) {
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
      }
      return token
    }
  }
}
