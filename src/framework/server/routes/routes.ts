import { Router } from "express";
import { amenityRoutes } from "./amenity/amenityRoutes";
import { landlordRoutes } from "./landlord/landlordRoutes";
import { propertyRoutes } from "./property/propertyRoutes";
import { tenantRoutes } from "./tenant/tenantRoutes";
import { contactRequestRoutes } from "./contactRequest/contactRequestRoutes";
import { propertyReviewRoutes } from "./propertyReview/propertyReviewRoutes";
import { rentDivisionRoutes } from "./tenant/rentDivision/rentDivisionRoutes";

const routes = Router();

routes
	.use(landlordRoutes)
	.use(tenantRoutes)
	.use(propertyRoutes)
	.use(amenityRoutes)
	.use(contactRequestRoutes)
	.use(propertyReviewRoutes)
	.use(rentDivisionRoutes);

export { routes };
