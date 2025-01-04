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
import { ExtendSizeRoutes } from '../modules/ExtendSize/ExtendSize.route';
import { FinishLevelRoutes } from '../modules/FinishLevel/FinishLevel.route';
import { BathroomRoutes } from '../modules/Bathroom/Bathroom.route';
import { WindowRoutes } from '../modules/Window/Window.route';
import { StartTimeRoutes } from '../modules/StartTime/StartTime.route';
import { ServiceRoutes } from '../modules/Service/Service.route';
import { DesignIdeaRoutes } from '../modules/DesignIdea/DesignIdea.route';
import { InclusionRoutes } from '../modules/Inclusion/Inclusion.route';
import { ExclusionRoutes } from '../modules/Exclusion/Exclusion.route';
import { CallAvailabilityRoutes } from '../modules/CallAvailability/CallAvailability.route';
import { CallBookingRoutes } from '../modules/CallBooking/CallBooking.route';
import { ProjectRoutes } from '../modules/Project/Project.route';
import { BlogRoutes } from '../modules/Blog/Blog.route';
import { CommentRoutes } from '../modules/comment/comment.route';
import { OtpRoutes } from '../modules/Otp/otp.route';
import { AboutUsRoutes } from '../modules/AboutUs/AboutUs.route';
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
  {
    path: '/extend-sizes',
    route: ExtendSizeRoutes,
  },
  {
    path: '/finish-levels',
    route: FinishLevelRoutes,
  },
  {
    path: '/bathrooms',
    route: BathroomRoutes,
  },
  {
    path: '/windows',
    route: WindowRoutes,
  },
  {
    path: '/start-times',
    route: StartTimeRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/design-ideas',
    route: DesignIdeaRoutes,
  },
  {
    path: '/inclusions',
    route: InclusionRoutes,
  },
  {
    path: '/exclusions',
    route: ExclusionRoutes,
  },
  {
    path: '/call-availabilities',
    route: CallAvailabilityRoutes,
  },
  {
    path: '/call-bookings',
    route: CallBookingRoutes,
  },
  {
    path: '/projects',
    route: ProjectRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
  {
    path: '/otps',
    route: OtpRoutes,
  },
  {
    path: '/abouts',
    route: AboutUsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
