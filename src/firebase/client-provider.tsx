'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { initializeFirebase } from '@/firebase/client';
import { FirebaseProvider } from '@/firebase/provider';
import { FirebaseErrorListener } from '@/components/firebase-error-listener';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

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
    // This check ensures that Firebase is only initialized on the client side.
    if (typeof window !== 'undefined') {
      const { app, db, auth } = initializeFirebase();
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
