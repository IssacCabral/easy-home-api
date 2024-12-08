import { Router } from "express";
import { shareRequestRoutes } from "./shareRequest/shareRequestRoutes";
import { rentDivisionRoutes } from "./rentDivision/rentDivisionRoutes";

export const tenantRoutes = Router();

tenantRoutes.use(shareRequestRoutes);
tenantRoutes.use(rentDivisionRoutes);
