'use server'

import bcrypt from 'bcryptjs'

import { RegisterSchema } from 'lib/schema'
import { supabase } from 'lib/supabaseClient'
import { getUserByPhone, getUserByEmail } from 'lib/utils/auth.util'
import { login } from './login.action'

export const register = async (values) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Barcha maydonlar to'ldirilishi shart" }
  }

  const { phone, email, password, data } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingPhone = await getUserByPhone(phone)

  if (existingPhone?.phone === phone) {
    return { error: 'User phone already exists.' }
  }
  const existingEmail = await getUserByEmail(email)

  if (existingEmail?.email === email) {
    return { error: 'User email already exists.' }
  }

  try {
    const { error: createError } = await supabase.from('user').insert({
      email,
      phone,
      password: hashedPassword,
    })

    if (createError) {
      console.error('Error creating user:', createError)
      return { error: 'Could not create user.' }
    }

    const res = await login({ phone, password, data })

    if (res?.error) {
      return { error: res.error }
    }
    return res
  } catch (error) {
    console.error('Registration error: ', error)
    return { error: 'An unexpected error occurred.' }
  }
}
