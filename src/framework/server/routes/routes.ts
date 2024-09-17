import { Router } from "express";
import { landlordRoutes } from "./landlord/landlordRoutes";
import { tenantRoutes } from "./tenant/tenantRoutes";
import { propertyRoutes } from "./property/propertyRoutes";

const routes = Router();

routes.use(landlordRoutes).use(tenantRoutes).use(propertyRoutes);

export { routes };
