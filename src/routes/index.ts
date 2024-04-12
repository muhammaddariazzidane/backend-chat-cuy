import { Application, Router } from 'express';
import { ChatRouter } from './chat.route';
import { AuthRouter } from './auth.route';

const _routes: Array<[string, Router]> = [
  ['/chat', ChatRouter],
  ['/auth', AuthRouter],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
