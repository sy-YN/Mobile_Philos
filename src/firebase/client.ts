'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from '@/firebase/config';

// This function is marked with 'use client' and will only run on the client.
export function initializeFirebase(): { app: FirebaseApp; db: Firestore; auth: Auth } {
  if (getApps().length) {
    const app = getApp();
    const db = getFirestore(app);
    const auth = getAuth(app);
    return { app, db, auth };
  }
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  return { app, db, auth };
}
