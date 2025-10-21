'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (!getApps().length) {
    const app = initializeApp(firebaseConfig);
    if (process.env.NEXT_PUBLIC_EMULATOR_HOST) {
      const host = process.env.NEXT_PUBLIC_EMULATOR_HOST;
      connectAuthEmulator(getAuth(app), `http://${host}:9099`, { disableWarnings: true });
      connectFirestoreEmulator(getFirestore(app), host, 8080);
    }
    return getSdks(app);
  }
  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}
