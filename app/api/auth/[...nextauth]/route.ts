import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/app/_lib/prisma";
import { Adapter } from "next-auth/adapters";

const handler = NextAuth({

  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: ""
    }),
  ]
})

export { handler as GET, handler as POST}