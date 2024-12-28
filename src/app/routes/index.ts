import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { AuthRoutes } from '../modules/Auth/auth.route';

// import { ClientRoutes } from '../modules/Client/actor.route';

// import { UserRoutes } from '../modules/User/user.route';
import { QuoteRoutes } from '../modules/Quote/quote.route';
import { UserRoutes } from '../modules/User/user.route';
import { PropertyRoutes } from '../modules/Property/Property.route';
import { PropertyPartRoutes } from '../modules/PropertyPart/PropertyPart.route';
import { RefurbishmentTypeRoutes } from '../modules/RefurbishmentType/RefurbishmentType.route';
import { RefurbishmentSizeRoutes } from '../modules/RefurbishmentSize/RefurbishmentSize.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  // {
  //   path: '/clients',
  //   route: ClientRoutes,
  // },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/quotes',
    route: QuoteRoutes,
  },
  {
    path: '/properties',
    route: PropertyRoutes,
  },
  {
    path: '/propertyParts',
    route: PropertyPartRoutes,
  },
  {
    path: '/refurbishment-types',
    route: RefurbishmentTypeRoutes,
  },
  {
    path: '/refurbishment-sizes',
    route: RefurbishmentSizeRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
