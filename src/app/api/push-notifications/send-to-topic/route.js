import { NextResponse } from 'next/server'
import { getMessaging } from 'firebase-admin/messaging'
import { initializeFirebaseAdmin } from 'lib/firebase/firebase-admin'

initializeFirebaseAdmin()

export async function POST(request) {
  try {
    const { topic, data } = await request.json()
    if (!topic) {
      return NextResponse.json(
        { success: false, message: 'Topic is required' },
        { status: 400 }
      )
    }

    const message = {
      topic,
      data: {
        title: data?.title || '',
        body: data?.body || '',
        icon: data?.icon || '',
        image: data?.image || '',
        actions: JSON.stringify(data?.actions) || '',
        vibrate: JSON.stringify(data?.vibrate) || '',
        requireInteraction: JSON.stringify(data?.requireInteraction) || '',
      },
    }

    const response = await getMessaging().send(message)

    return NextResponse.json({
      success: true,
      message: 'Notification sent to topic successfully',
      messageId: response,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'An error occurred sending notification',
      },
      { status: 500 }
    )
  }
}
