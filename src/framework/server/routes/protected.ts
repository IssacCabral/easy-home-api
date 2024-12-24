import { makeAuthMiddleware } from "@framework/factories/middlewares/authMiddlewareFactory";
import { Router } from "express";
import { ExpressMiddlewareAdapter } from "../adapters/expressMiddlewareAdapter";
import { amenityRoutes } from "./amenity/amenityRoutes";
import { contactRequestRoutes } from "./contactRequest/contactRequestRoutes";
import { landlordRoutes } from "./landlord/landlordRoutes";
import { propertyRoutes } from "./property/propertyRoutes";
import { propertyReviewRoutes } from "./propertyReview/propertyReviewRoutes";
import { tenantRoutes } from "./tenant/tenantRoutes";

export const protectedRoutes = Router();

const authMiddleware = ExpressMiddlewareAdapter.adapt(makeAuthMiddleware());

protectedRoutes.use(
	authMiddleware,
	propertyRoutes,
	amenityRoutes,
	contactRequestRoutes,
	propertyReviewRoutes,
	tenantRoutes,
	landlordRoutes,
);
