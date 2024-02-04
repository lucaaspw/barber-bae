import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/app/_lib/prisma";
import { Adapter } from "next-auth/adapters";
import { AuthOptions } from "next-auth";

export const authOption: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ]
}

const handler = NextAuth(authOption)

export { handler as GET, handler as POST}