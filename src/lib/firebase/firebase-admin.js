import { initializeApp, cert, getApps } from 'firebase-admin/app'

// eslint-disable-next-line no-undef
const json = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS || '{}')

function initializeFirebaseAdmin() {
  if (!getApps().length) {
    try {
      initializeApp({
        credential: cert(json),
      })
    } catch (error) {
      console.error('Failed to initialize Firebase Admin:', error)
    }
  }
}

export { initializeFirebaseAdmin }
