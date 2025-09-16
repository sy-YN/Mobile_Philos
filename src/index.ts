import { https } from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import next from 'next';

initializeApp();

const isDev = process.env.NODE_ENV !== 'production';

const server = next({
  dev: isDev,
  conf: { distDir: '.next' },
});

const nextjsHandle = server.getRequestHandler();

export const nextApp = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});
