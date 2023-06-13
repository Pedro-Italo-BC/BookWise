import { PrismaAdapter } from '@/lib/auth/prisma-adapter'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { prisma } from '@/lib/prisma'
import { Adapter } from 'next-auth/adapters'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

const handler = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      profile(profile: GoogleProfile) {
        return {
          email: profile.email,
          id: profile.sub,
          name: profile.name,
          image: profile.picture,
        }
      },
    }),
  ],

  debug: true,
})

export { handler as GET, handler as POST }
