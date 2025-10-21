// This file is a 'use client' component, but it's used by server components.
// We need to keep this file as a server component and only use the context part on the client.
// The actual provider with the 'use client' directive is in firebase-client-provider.tsx

import React, { createContext, useContext, ReactNode } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';

interface FirebaseContextType {
  app: FirebaseApp | null;
  db: Firestore | null;
  auth: Auth | null;
}

// Create a context with a default value.
// Note: This context will be used by client components, so its value will be provided
// by a client-side provider.
const FirebaseContext = createContext<FirebaseContextType>({
  app: null,
  db: null,
  auth: null,
});

// This is the provider component that will wrap our app.
// It receives the firebase instances as props.
export function FirebaseProvider({
  children,
  app,
  db,
  auth,
}: {
  children: ReactNode;
  app: FirebaseApp | null;
  db: Firestore | null;
  auth: Auth | null;
}) {
  return (
    <FirebaseContext.Provider value={{ app, db, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
}

// Custom hooks to use the Firebase context
export const useFirebase = () => useContext(FirebaseContext);
export const useFirestore = () => useContext(FirebaseContext);
export const useAuth = () => useContext(FirebaseContext);
