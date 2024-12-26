import { Router } from "express";
import { shareRequestRoutes } from "./shareRequest/shareRequestRoutes";
import { rentDivisionRoutes } from "./rentDivision/rentDivisionRoutes";
import { tenantGuard } from "@framework/server/middlewares/guards";
import { makeFindPropertiesOfInterestController } from "@framework/factories/controllers/components/tenant/findPropertiesOfInterestControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";

export const tenantRoutes = Router();

tenantRoutes.use(shareRequestRoutes);
tenantRoutes.use(rentDivisionRoutes);
tenantRoutes.get(
	"/tenants/properties-of-interest",
	tenantGuard,
	ExpressRoutesAdapter.adapt(makeFindPropertiesOfInterestController()),
);
