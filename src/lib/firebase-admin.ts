
import * as admin from 'firebase-admin';

// Check if the app is already initialized to prevent errors
if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase Admin SDK credentials. Please check your .env.local file.');
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        // The private key needs to have its newlines escaped in the .env file.
        // The `replace` function correctly un-escapes them for the SDK.
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
    // Throw a more specific error to make debugging easier
    throw new Error('Failed to initialize Firebase Admin SDK. Please check your credentials.');
  }
}

export const db = admin.firestore();
