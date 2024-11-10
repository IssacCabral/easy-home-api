import { Router } from "express";
import { amenityRoutes } from "./amenity/amenityRoutes";
import { landlordRoutes } from "./landlord/landlordRoutes";
import { propertyRoutes } from "./property/propertyRoutes";
import { tenantRoutes } from "./tenant/tenantRoutes";

const routes = Router();

routes.use(landlordRoutes).use(tenantRoutes).use(propertyRoutes).use(amenityRoutes);

export { routes };
