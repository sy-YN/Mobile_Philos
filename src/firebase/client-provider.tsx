'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { FirebaseProvider } from '@/firebase/provider';
import { FirebaseErrorListener } from '@/components/firebase-error-listener';
import { firebaseConfig } from '@/firebase/config';

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
    if (firebaseConfig.projectId) {
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      const db = getFirestore(app);
      const auth = getAuth(app);
      setFirebaseInstances({ app, db, auth });
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
