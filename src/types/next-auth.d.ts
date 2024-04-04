import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';
import Providers from 'next-auth/providers';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
    }
  }
}