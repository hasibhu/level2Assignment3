import { Router } from 'express';
import { UserRoutes } from '../module/user/user.routes';
import { AuthRoutes } from '../module/login/login.routes';
import { BlogRoutes } from '../module/blog/blog.routes';
const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  
  {
    path: '/auth',
    route: AuthRoutes,
  },

  {
    path: '/app/',
    route: BlogRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
