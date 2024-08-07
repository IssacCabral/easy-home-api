import { Router } from "express";
import { landlordRoutes } from "./landlord/landlordRoutes";

const routes = Router();

routes.use(landlordRoutes);

export { routes };
