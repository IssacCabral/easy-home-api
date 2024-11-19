import { makeOpenRentDivisionController } from "@framework/factories/controllers/components/tenant/rentDivision/openRentDivisionControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { Router } from "express";

export const rentDivisionRoutes = Router();

rentDivisionRoutes.patch(
	"/rent-division/open/:propertyId",
	ExpressRoutesAdapter.adapt(makeOpenRentDivisionController()),
);
