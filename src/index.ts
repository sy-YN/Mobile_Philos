import {https} from 'firebase-functions';
import {initializeApp, getApps} from 'firebase-admin/app';

if (getApps().length === 0) {
  initializeApp();
}

let server: (req: any, res: any) => void;

export const nextServer = https.onRequest(async (req, res) => {
  if (!server) {
    const {default: next} = await import('next');
    const app = next({
      dev: false,
      conf: {
        distDir: '.next',
      },
    });
    const handle = app.getRequestHandler();
    server = (req, res) => {
      return app.prepare().then(() => handle(req, res));
    };
  }
  return server(req, res);
});
