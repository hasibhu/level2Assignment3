import { Router } from 'express';
import { UserRoutes } from '../module/user/user.routes';
import { AuthRoutes } from '../module/login/login.routes';
import { BlogRoutes } from '../module/blog/blog.routes';
import { AdminRoutes } from '../module/admin/admin.routes';
const router = Router();

const moduleRoutes = [
  {
    path: '/api/',
    route: UserRoutes,
  },
  
  {
    path: '/api',
    route: AuthRoutes,
  },

  {
    path: '/api/',
    route: BlogRoutes
  },
  {
    path: '/api/',
    route: AdminRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
