import { prisma } from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { getCsrfToken } from "next-auth/react"
 
export const { auth, handlers, signIn, signOut } = NextAuth({

  adapter: PrismaAdapter(prisma),
  session: {strategy:"jwt"},
  providers: [GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET
  }), Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET
  })],
  callbacks : {
    session: ({session,token}) => ({
      ...session,
      user:{
        ...session.user,
        id:token.sub
      }
    })
  }
})