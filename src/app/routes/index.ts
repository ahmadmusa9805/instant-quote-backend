import { Router } from 'express';
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
// import { CallAvailabilityRoutes } from '../modules/CallAvailability/CallAvailability.route';
import { CallBookingRoutes } from '../modules/CallBooking/CallBooking.route';
import { ProjectRoutes } from '../modules/Project/Project.route';
import { BlogRoutes } from '../modules/Blog/Blog.route';
import { CommentRoutes } from '../modules/comment/comment.route';
import { OtpRoutes } from '../modules/Otp/otp.route';
import { AboutUsRoutes } from '../modules/AboutUs/AboutUs.route';
import { PrivacyRoutes } from '../modules/Privacy/Privacy.route';
import { TermRoutes } from '../modules/Term/Term.route';
import { WeDoRoutes } from '../modules/WeDo/WeDo.route';
import { ContactRoutes } from '../modules/Contact/Contact.route';
import { QuotePricingRoutes } from '../modules/QuotePricing/QuotePricing.route';
import { NotificationRoutes } from '../modules/Notification/Notification.route';
import { CallAvailabilityRoutes } from '../modules/CallAvailability/CallAvailability.route';
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
    path: '/quotes',
    route: QuoteRoutes,
  },
  {
    path: '/quote-pricings',
    route: QuotePricingRoutes,
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
  {
    path: '/privacies',
    route: PrivacyRoutes,
  },
  {
    path: '/terms',
    route: TermRoutes,
  },
  {
    path: '/we-dos',
    route: WeDoRoutes,
  },
  {
    path: '/contacts',
    route: ContactRoutes,
  },
  {
    path: '/notifications',
    route: NotificationRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
