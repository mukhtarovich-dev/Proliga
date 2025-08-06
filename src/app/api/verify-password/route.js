import { NextResponse } from 'next/server'
import { supabase } from 'lib/supabaseClient'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const { phone, password } = await request.json()
    if (!phone || !password) {
      return NextResponse.json({ error: 'Missing phone or password' }, { status: 400 })
    }
    console.log('phone', phone)
    // Query user by phone
    const { data: user, error } = await supabase
      .from('user')
      .select('id, password')
      .eq('phone', phone)
      .is('deleted_at', null)
      .single()
    console.log('user', user)
    console.log('error', error)
    if (error || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (!user.password) {
      return NextResponse.json({ error: "User has no password set" }, { status: 400 })
    }

    // Compare password (assuming bcrypt)
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
