import { Router } from "express";
import { landlordRoutes } from "./landlord/landlordRoutes";
import { propertyRoutes } from "./property/propertyRoutes";
import { tenantRoutes } from "./tenant/tenantRoutes";
import { amenityRoutes } from "./amenity/amenityRoutes";

const routes = Router();

routes.use(landlordRoutes).use(tenantRoutes).use(propertyRoutes).use(amenityRoutes);

export { routes };
