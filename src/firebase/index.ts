// This file is the "barrel" for all client-side Firebase related functionality.
// It exports a set of hooks and providers that can be used in any client-side
// component to access Firebase services.

import { useCollection, useDoc } from './firestore/hooks';
import { useUser, useAuth, useFirebaseApp, useFirestore, useFirebase } from './provider';
import { FirebaseClientProvider } from './client-provider';

export {
    useCollection,
    useDoc,
    useUser,
    useAuth,
    useFirebaseApp,
    useFirestore,
    useFirebase,
    FirebaseClientProvider
};
