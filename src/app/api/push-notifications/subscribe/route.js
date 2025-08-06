import { NextResponse } from 'next/server'
import { getMessaging } from 'firebase-admin/messaging'
import { initializeFirebaseAdmin } from 'lib/firebase/firebase-admin'
import { supabase } from 'lib/supabaseClient'

initializeFirebaseAdmin()

export async function POST(request) {
  try {
    const { token, topic, user_id } = await request.json()

    if (!token || !topic) {
      return NextResponse.json(
        { success: false, message: 'FCM token and topic are required' },
        { status: 400 }
      )
    }
    if (!user_id) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      )
    }

    const { data: user_token, error } = await supabase
      .from('user_token')
      .select('*')
      .eq('user_id', user_id)
      .eq('token', token)
      .single()

    if (error?.code === 'PGRST116') {
      return NextResponse.json({
        success: false,
        message: 'User token not found',
      }, { status: 404 })
    }

    if (error) {
      console.error(error)
      return NextResponse.json(
        { success: false, message: 'Error getting user notification topics' },
        { status: 500 }
      )
    }

    const newTopics = [...new Set([...(user_token.topics || []), topic])]

    const { error: updateError } = await supabase
      .from('user_token')
      .update({
        topics: newTopics,
      })
      .eq('id', user_token.id)

    if (updateError) {
      return NextResponse.json(
        { success: false, message: 'Error updating user token' },
        { status: 500 }
      )
    }

    await getMessaging().subscribeToTopic(token, topic)

    return NextResponse.json({
      success: true,
      message: `Successfully subscribed to topic: ${topic}`,
    })
  } catch (error) {
    console.error('Error subscribing to topic:', error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'An error occurred while subscribing to topic',
      },
      { status: 500 }
    )
  }
}
