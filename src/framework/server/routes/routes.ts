import { Router } from "express";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";

const routes = Router();
routes.use(publicRoutes).use(protectedRoutes);

export { routes };
