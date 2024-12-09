import { makeCancelRentDivisionController } from "@framework/factories/controllers/components/tenant/rentDivision/cancelRentDivisionControllerFactory";
import { makeCompleteRentDivisionController } from "@framework/factories/controllers/components/tenant/rentDivision/completeRentDivisionControllerFactory";
import { makeFindSharedRentalTenantsController } from "@framework/factories/controllers/components/tenant/rentDivision/findSharedRentalTenantsControllerFactory";
import { makeOpenRentDivisionController } from "@framework/factories/controllers/components/tenant/rentDivision/openRentDivisionControllerFactory";
import { makeStopTenantRentDivisionController } from "@framework/factories/controllers/components/tenant/rentDivision/stopTenantRentDivisionControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { tenantGuard } from "@framework/server/middlewares/guards";
import { Router } from "express";

export const rentDivisionRoutes = Router();

rentDivisionRoutes.patch(
	"/rent-divisions/open/:propertyId",
	tenantGuard,
	ExpressRoutesAdapter.adapt(makeOpenRentDivisionController()),
);
rentDivisionRoutes.patch(
	"/rent-divisions/cancel/:propertyId",
	tenantGuard,
	ExpressRoutesAdapter.adapt(makeCancelRentDivisionController()),
);
rentDivisionRoutes.post(
	"/rent-divisions/complete/:propertyId",
	tenantGuard,
	ExpressRoutesAdapter.adapt(makeCompleteRentDivisionController()),
);
rentDivisionRoutes.get(
	"/rent-divisions/:propertyId",
	tenantGuard,
	ExpressRoutesAdapter.adapt(makeFindSharedRentalTenantsController()),
);
rentDivisionRoutes.post(
	"/rent-divisions/stop",
	tenantGuard,
	ExpressRoutesAdapter.adapt(makeStopTenantRentDivisionController()),
);
