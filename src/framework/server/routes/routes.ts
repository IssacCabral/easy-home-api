import { Router } from "express";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

const routes = Router();
routes.use(publicRoutes).use(protectedRoutes);

export { routes };
