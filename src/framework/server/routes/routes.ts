import { Router } from "express";
import { landlordRoutes } from "./landlord/landlordRoutes";
import { tenantRoutes } from "./tenant/tenantRoutes";

const routes = Router();

routes.use(landlordRoutes).use(tenantRoutes);

export { routes };
