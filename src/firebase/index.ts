// This file acts as a barrel for all Firebase-related functionalities.
// It re-exports modules to simplify import paths in other parts of the application.

export * from './config';
export * from './client-provider';
export * from './provider'; // Re-exporting hooks like useFirebase, useFirestore, useAuth
export * from './error-emitter';
export * from './errors';
