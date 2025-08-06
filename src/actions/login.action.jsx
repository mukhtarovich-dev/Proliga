'use server'

import { LoginSchema } from 'lib/schema'
import { signIn } from 'app/api/auth/[...nextauth]/route'
import { getUserByPhone } from 'lib/utils/auth.util'
import { supabase } from 'lib/supabaseClient'

export const login = async (values) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Barcha maydonlar to'ldirilishi shart" }
  }

  const { phone, password, data } = validatedFields.data

  const existingUser = await getUserByPhone(phone)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Login yoki parol xato' }
  }

  try {
    await signIn('credentials', {
      phone,
      password,
      redirect: false,
    })

    const { error: updateError } = await supabase
      .from('user')
      .update({
        geo: data?.geo,
        agent: data?.agent,
        visitor: data?.fingerprint,
        visited_at: new Date(),
      })
      .eq('id', existingUser.id)
      .is('deleted_at', null)

    if (updateError) {
      console.error('Error updating user:', updateError)
      return { error: 'Could not update user information.' }
    }

    return {
      success: true,
      user: existingUser,
      phone: existingUser?.phone,
      phone_verified: existingUser?.phone_verified,
    }
  } catch (error) {
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Login yoki parol xato' }
        default:
          return { error: 'An unknown error occurred' }
      }
    }

    throw error
  }
}
