import { makeCancelRentDivisionController } from "@framework/factories/controllers/components/tenant/rentDivision/cancelRentDivisionControllerFactory";
import { makeOpenRentDivisionController } from "@framework/factories/controllers/components/tenant/rentDivision/openRentDivisionControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { Router } from "express";

export const rentDivisionRoutes = Router();

rentDivisionRoutes.patch(
	"/rent-division/open/:propertyId",
	ExpressRoutesAdapter.adapt(makeOpenRentDivisionController()),
);
rentDivisionRoutes.patch(
	"/rent-division/cancel/:propertyId",
	ExpressRoutesAdapter.adapt(makeCancelRentDivisionController()),
);
