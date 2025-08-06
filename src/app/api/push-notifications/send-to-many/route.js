import { NextResponse } from 'next/server'
import { getMessaging } from 'firebase-admin/messaging'
import { initializeFirebaseAdmin } from 'lib/firebase/firebase-admin'

initializeFirebaseAdmin()

export async function POST(request) {
  try {
    const { tokens, data } = await request.json()

    if (!tokens || !Array.isArray(tokens) || tokens.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Array of FCM tokens is required' },
        { status: 400 }
      )
    }

    const message = {
      tokens,
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

    const response = await getMessaging().sendEachForMulticast(message)

    const failedTokens = []
    if (response.failureCount > 0) {
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(tokens[idx])
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Notifications sent',
      successCount: response.successCount,
      failureCount: response.failureCount,
      failedTokens,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'An error occurred sending notifications',
      },
      { status: 500 }
    )
  }
}
