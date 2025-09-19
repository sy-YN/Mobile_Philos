import { https } from 'firebase-functions';
import { initializeApp, getApps } from 'firebase-admin/app';
import next from 'next';

if (getApps().length === 0) {
  initializeApp();
}

const isDev = process.env.NODE_ENV !== 'production';

const nextApp = next({
  dev: isDev,
  conf: { distDir: '.next' },
});
const handle = nextApp.getRequestHandler();

export const server = https.onRequest((req, res) => {
  return nextApp.prepare().then(() => handle(req, res));
});
