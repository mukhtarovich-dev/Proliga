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

    // Just set topics to null for this user_token row
    const { error } = await supabase
      .from('user_token')
      .update({ topics: [] })
      .eq('user_id', user_id)
      .eq('token', token)

    if (error) {
      return NextResponse.json(
        { success: false, message: 'Error updating user notification token topics' },
        { status: 500 }
      )
    }

    await getMessaging().unsubscribeFromTopic(token, topic)

    return NextResponse.json({
      success: true,
      message: `Successfully unsubscribed from topic: ${topic}`,
    })
  } catch (error) {
    console.error('Error unsubscribing from topic:', error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'An error occurred while unsubscribing from topic',
      },
      { status: 500 }
    )
  }
}
