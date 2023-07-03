// @ts-nocheck

import { Prisma, PrismaClient, VerificationToken } from '@prisma/client'
import { Awaitable } from 'next-auth'
import {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
} from 'next-auth/adapters'
import { ProviderType } from 'next-auth/providers'

export function PrismaAdapter(p: PrismaClient): Adapter {
  return {
    createUser: async (
      data: Omit<AdapterUser, 'id'>,
    ): Awaitable<AdapterUser> => {
      const user = await p.user.create({ data })

      return {
        email: user.email,
        id: user.id,
        image: user.image,
        name: user.name,
        emailVerified: user.emailVerified,
      }
    },
    getUser: async (id: string): Awaitable<AdapterUser | null> => {
      const user = await p.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) {
        return null
      }

      return {
        email: user.email,
        emailVerified: user.emailVerified,
        id: user.id,
        image: user.image,
        name: user.name,
      }
    },
    createSession: async (session: {
      sessionToken: string
      userId: string
      expires: Date
    }): Awaitable<AdapterSession> => {
      const sessionRes = await p.session.create({
        data: {
          sessionToken: session.sessionToken,
          expires: session.expires,
          access_token: session.sessionToken,
          userId: session.userId,
        },
      })

      return {
        expires: sessionRes.expires,
        sessionToken: sessionRes.sessionToken,
        userId: sessionRes.userId,
      }
    },
    getUserByEmail: async (email: string): Awaitable<AdapterUser | null> => {
      const user = await p.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        return null
      }

      return {
        email: user.email,
        id: user.id,
        emailVerified: user.emailVerified,
        image: user.image,
        name: user.name,
      }
    },
    getUserByAccount: async ({
      provider,
      providerAccountId,
    }: Pick<
      AdapterAccount,
      'provider' | 'providerAccountId'
    >): Awaitable<AdapterUser | null> => {
      const account = await p.account.findUnique({
        where: {
          provider_providerAccountId: {
            providerAccountId,
            provider,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) {
        return null
      }

      const { user } = account

      return {
        email: user.email,
        emailVerified: user.emailVerified,
        id: user.id,
        image: user.image,
        name: user.name,
      }
    },
    updateUser: async (
      user: Partial<AdapterUser> & Pick<AdapterUser, 'id'>,
    ): Awaitable<AdapterUser> => {
      const userRes = await p.user.update({
        where: {
          id: user.id,
        },
        data: {
          image: user.image,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
        },
      })

      return {
        email: userRes.email,
        emailVerified: userRes.emailVerified,
        id: userRes.id,
        image: userRes.image,
        name: userRes.name,
      }
    },
    deleteUser: async (
      userId: string,
    ): Promise<void> | Awaitable<AdapterUser | null | undefined> => {
      await p.user.delete({
        where: {
          id: userId,
        },
      })
    },
    linkAccount: async (
      account: AdapterAccount,
    ): Promise<void> | Awaitable<AdapterAccount | null | undefined> => {
      const accountRes = await p.account.create({
        data: {
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          type: account.type,
          access_token: account.access_token,
          expires_at: account.expires_at,
          id_token: account.id_token,
          refresh_token: account.refresh_token,
          scope: account.scope,
          session_state: account.session_state,
          token_type: account.token_type,
          userId: account.userId,
        },
      })

      return {
        provider: accountRes.provider,
        providerAccountId: accountRes.providerAccountId,
        type: accountRes.type as ProviderType,
        access_token: accountRes.access_token ?? undefined,
        expires_at: accountRes.expires_at ?? undefined,
        id_token: accountRes.id_token ?? undefined,
        refresh_token: accountRes.refresh_token ?? undefined,
        scope: accountRes.scope ?? undefined,
        session_state: accountRes.session_state ?? undefined,
        token_type: accountRes.token_type ?? undefined,
        userId: accountRes.userId,
      }
    },
    unlinkAccount: async (
      providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>,
    ): Promise<void> => {
      await p.account.delete({
        where: { provider_providerAccountId: providerAccountId },
      })
    },
    getSessionAndUser: async (
      sessionTokenParams: string,
    ): Awaitable<{ session: AdapterSession; user: AdapterUser } | null> => {
      const userAndSession = await p.session.findUnique({
        where: { access_token: sessionTokenParams },
        include: { user: true },
      })

      if (!userAndSession) {
        return null
      }
      const {
        createdAt,
        expires,
        sessionToken,
        updatedAt,
        userId,
        user,
        access_token,
      } = userAndSession
      const session = {
        access_token,
        createdAt,
        expires,
        sessionToken,
        updatedAt,
        userId,
      }

      return {
        session,
        user,
      }
    },
    updateSession: async (
      session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>,
    ): Awaitable<AdapterSession | null | undefined> => {
      const sessionRes = await p.session.update({
        where: {
          sessionToken: session.sessionToken,
        },
        data: session,
      })

      return {
        expires: sessionRes.expires,
        sessionToken: session.sessionToken,
        userId: session.userId!,
      }
    },
    deleteSession: async (
      sessionToken: string,
    ): Promise<void> | Awaitable<AdapterSession | null | undefined> => {
      await p.session.delete({
        where: {
          sessionToken,
        },
      })
    },
    createVerificationToken: async (
      verificationToken: VerificationToken,
    ): Awaitable<VerificationToken | null | undefined> => {
      const verificationTokenRes = await p.verificationToken.create({
        data: {
          expires: verificationToken.expires,
          identifier: verificationToken.identifier,
          token: verificationToken.token,
        },
      })

      return {
        expires: verificationTokenRes.expires,
        identifier: verificationToken.identifier,
        token: verificationTokenRes.token,
      }
    },

    useVerificationToken: async (identifier_token: {
      identifier: string
      token: string
    }): Awaitable<VerificationToken | null> => {
      try {
        const verificationToken = await p.verificationToken.delete({
          where: { identifier_token },
        })
        // @ts-expect-errors // MongoDB needs an ID, but we don't
        if (verificationToken.id) delete verificationToken.id
        return verificationToken
      } catch (error) {
        // If token already used/deleted, just return null
        // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
        if ((error as Prisma.PrismaClientKnownRequestError).code === 'P2025')
          return null
        throw error
      }
    },
  }
}
