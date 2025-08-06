import { NextResponse } from 'next/server'
import { getMessaging } from 'firebase-admin/messaging'
import { initializeFirebaseAdmin } from 'lib/firebase/firebase-admin'

initializeFirebaseAdmin()

export async function POST(request) {
  try {
    const { token, data } = await request.json()

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'FCM token is required' },
        { status: 400 }
      )
    }

    const message = {
      token,
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
      message: 'Notification sent successfully',
      messageId: response,
    })
  } catch (error) {
    console.error('Error sending push notification:', error)
    if (error.code === 'messaging/registration-token-not-registered') {
      return NextResponse.json(
        {
          success: false,
          message: 'The provided FCM token is no longer valid.',
        },
        { status: 404 }
      )
    }
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
