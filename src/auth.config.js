/* eslint-disable no-undef */
import GoogleProvider from 'next-auth/providers/google'
import YandexProvider from 'next-auth/providers/yandex'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { getUserByPhone } from 'lib/utils/auth.util'
import { LoginSchema } from 'lib/schema'

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID ?? '',
      clientSecret: process.env.YANDEX_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        phone: { label: 'Phone', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { phone, password } = validatedFields.data

          const user = await getUserByPhone(phone)
          if (!user || !user.password) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)
          if (passwordsMatch) return user
        }

        return null
      },
    }),
  ],
}
