import express, { Router } from 'express';
import webhookRoute from './webhook.route'

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/',
    route: webhookRoute,
  }
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
