import NextAuth from 'next-auth'
import { authConfig } from 'auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from 'lib/prisma'
import { getUserById } from 'lib/utils/auth.util'
import { LANGUAGE } from 'utils/languages.util'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true
      if (!user?.id) return false
      return true
    },
    async jwt({ token, user, account, trigger, session }) {
      if (user?.id && account) {
        token.sub = String(user.id)
        token.id = user.id

        token.email = user.email || null
        token.name = user.name || null
        token.image = user.image || null
        token.isOAuth = account.provider !== 'credentials'
        token.phone = null
        token.birth_date = null
        token.last_name = null
        token.middle_name = null
        token.gender = null
        token.bio = null
        token.balance = null
        token.deleted_at = null
        token.language = LANGUAGE.uz
        token.phone_verified = false
        token.location = null
        token.theme_id = null
        token.user_theme_id = null
        token.is_admin = false
        token.notification_enabled = true

        const dbUser = await getUserById(user.id)
        if (dbUser) {
          token.email = dbUser.email
          token.phone = dbUser.phone
          token.isOAuth = dbUser.isOAuth
          token.birth_date = dbUser.birth_date
          token.name = dbUser.name
          token.last_name = dbUser.last_name
          token.middle_name = dbUser.middle_name
          token.gender = dbUser.gender
          token.bio = dbUser.bio
          token.balance = dbUser.balance
          token.image = dbUser.image
          token.deleted_at = dbUser.deleted_at
          token.language = dbUser.language || LANGUAGE.uz
          token.phone_verified = dbUser.phone_verified
          token.location = dbUser.location
          token.theme_id = dbUser.theme_id
          token.user_theme_id = dbUser.user_theme_id
          token.is_admin = dbUser.is_admin
          token.notification_enabled = dbUser.notification_enabled
        }
      }

      if (trigger === 'update' && session) {
        const allowedUpdates = [
          'name',
          'last_name',
          'middle_name',
          'gender',
          'bio',
          'image',
          'phone_verified',
          'language',
          'location',
          'theme_id',
          'user_theme_id',
          'birth_date',
          'phone',
          'is_admin',
          'phone_new',
          'phones_old',
          'emailVerified',
          'isOAuth',
          'email',
          'phone_verified',
          'visitor',
          'visited_at',
          'geo',
          'agent',
          'notification_enabled',
        ]
        for (const key of allowedUpdates) {
          if (Object.hasOwn(session, key)) {
            token[key] = session[key]
          }
        }
      }
      return token
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.id ? Number(token.id) : Number(token.sub)
      }
      if (session.user && token) {
        session.user.email = token.email
        session.user.phone = token.phone
        session.user.isOAuth = token.isOAuth
        session.user.birth_date = token.birth_date
        session.user.name = token.name
        session.user.last_name = token.last_name
        session.user.middle_name = token.middle_name
        session.user.gender = token.gender
        session.user.bio = token.bio
        session.user.balance = token.balance
        session.user.image = token.image
        session.user.deleted_at = token.deleted_at
        session.user.language = token.language
        session.user.phone_verified = token.phone_verified
        session.user.location = token.location
        session.user.theme_id = token.theme_id
        session.user.user_theme_id = token.user_theme_id
        session.user.is_admin = token.is_admin
        session.user.notification_enabled = token.notification_enabled
      }
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth',
    signOut: '/',
    error: '/auth',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // ~ 1 month
  },
})
