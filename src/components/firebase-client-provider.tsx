'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { FirebaseProvider } from '@/components/firebase-provider';
import { FirebaseErrorListener } from '@/components/firebase-error-listener';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

interface FirebaseInstances {
  app: FirebaseApp | null;
  db: Firestore | null;
  auth: Auth | null;
}

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [firebaseInstances, setFirebaseInstances] = useState<FirebaseInstances>({
    app: null,
    db: null,
    auth: null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && firebaseConfig.projectId) {
      if (!getApps().length) {
        try {
          const app = initializeApp(firebaseConfig);
          const db = getFirestore(app);
          const auth = getAuth(app);
          setFirebaseInstances({ app, db, auth });
        } catch (e) {
          console.error("Firebase initialization error", e);
        }
      } else {
        const app = getApps()[0];
        const db = getFirestore(app);
        const auth = getAuth(app);
        setFirebaseInstances({ app, db, auth });
      }
    }
  }, []);

  return (
    <FirebaseProvider
      app={firebaseInstances.app}
      db={firebaseInstances.db}
      auth={firebaseInstances.auth}
    >
      {children}
      <FirebaseErrorListener />
    </FirebaseProvider>
  );
}