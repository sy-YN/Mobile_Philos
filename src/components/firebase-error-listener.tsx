
'use client';
import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';

// This is a workaround to get the Next.js error overlay to show the error
// from a global event emitter.
const throwError = (error: Error) => {
    // We create a promise that will be rejected with the error.
    // This is to trick Next.js into thinking that the error is coming from a promise.
    const promise = new Promise((resolve, reject) => {
        reject(error);
    });

    // We need to attach a catch block to the promise to prevent an unhandled promise rejection.
    promise.catch(() => {});

    // We throw the promise to get the Next.js error overlay to show the error.
    throw promise;
}


export function FirebaseErrorListener() {
    useEffect(() => {
        const handleError = (error: Error) => {
            console.log('FirebaseErrorListener caught an error:', error);
            // We need to throw the error in a timeout to get the Next.js error overlay to show it.
            setTimeout(() => {
                throwError(error);
            }, 0);
        };

        errorEmitter.on('permission-error', handleError);

        return () => {
            errorEmitter.off('permission-error', handleError);
        };
    }, []);

    return null;
}
