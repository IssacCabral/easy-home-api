import { makeCancelRentDivisionController } from "@framework/factories/controllers/components/tenant/rentDivision/cancelRentDivisionControllerFactory";
import { makeCompleteRentDivisionController } from "@framework/factories/controllers/components/tenant/rentDivision/completeRentDivisionControllerFactory";
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
rentDivisionRoutes.post(
	"/rent-division/complete/:propertyId",
	ExpressRoutesAdapter.adapt(makeCompleteRentDivisionController()),
);
