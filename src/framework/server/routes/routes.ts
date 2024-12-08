import { Router } from "express";
import { amenityRoutes } from "./amenity/amenityRoutes";
import { landlordRoutes } from "./landlord/landlordRoutes";
import { propertyRoutes } from "./property/propertyRoutes";
import { tenantRoutes } from "./tenant/tenantRoutes";
import { contactRequestRoutes } from "./contactRequest/contactRequestRoutes";
import { propertyReviewRoutes } from "./propertyReview/propertyReviewRoutes";
import { rentDivisionRoutes } from "./tenant/rentDivision/rentDivisionRoutes";
import { shareRequestRoutes } from "./tenant/shareRequest/shareRequestRoutes";
import { authRoutes } from "./auth/authRoutes";
import { ExpressMiddlewareAdapter } from "../adapters/expressMiddlewareAdapter";
import { makeAuthMiddleware } from "@framework/factories/middlewares/authMiddlewareFactory";

const routes = Router();

const authMiddleware = ExpressMiddlewareAdapter.adapt(makeAuthMiddleware());

routes.use(authRoutes);
routes.use(
	authMiddleware,
	landlordRoutes,
	tenantRoutes,
	propertyRoutes,
	amenityRoutes,
	contactRequestRoutes,
	propertyReviewRoutes,
	rentDivisionRoutes,
	shareRequestRoutes,
);

export { routes };
