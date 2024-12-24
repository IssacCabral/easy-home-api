import { Router } from "express";
import { rentDivisionRoutes } from "./rentDivision/rentDivisionRoutes";
import { shareRequestRoutes } from "./shareRequest/shareRequestRoutes";

export const tenantRoutes = Router();

tenantRoutes.use(shareRequestRoutes);
tenantRoutes.use(rentDivisionRoutes);
