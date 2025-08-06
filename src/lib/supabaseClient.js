/* eslint-disable no-undef */
// import { PostgrestClient } from '@supabase/postgrest-js';
import { createClient } from '@supabase/supabase-js'

// export const supabase = new PostgrestClient(process.env.NEXT_PUBLIC_SUPABASE_URL, {
//   // headers: {
//   //   apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//   //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`, // optional if using anon
//   // },
// });

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
)

export const SUPABASE_EVENT_TYPE = {
  INSERT: 'INSERT',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
}

export const SUPABASE_PROVIDERS = {
  EMAIL: 'email',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  YANDEX: 'yandex',
  CREDENTIALS: 'credentials',
}
