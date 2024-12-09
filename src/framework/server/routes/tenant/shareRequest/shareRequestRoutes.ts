import { makeCreateShareRequestController } from "@framework/factories/controllers/components/tenant/shareRequest/createShareRequestControllerFactory";
import { makeFinishShareRequestController } from "@framework/factories/controllers/components/tenant/shareRequest/finishShareRequestControllerFactory";
import { makeSelectShareRequestController } from "@framework/factories/controllers/components/tenant/shareRequest/selectShareRequestControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { tenantGuard } from "@framework/server/middlewares/guards";
import { Router } from "express";

export const shareRequestRoutes = Router();

shareRequestRoutes.post("/share-requests", tenantGuard, ExpressRoutesAdapter.adapt(makeCreateShareRequestController()));
shareRequestRoutes.patch(
	"/share-requests/select/:id",
	tenantGuard,
	ExpressRoutesAdapter.adapt(makeSelectShareRequestController()),
);
shareRequestRoutes.patch(
	"/share-requests/finish/:id",
	tenantGuard,
	ExpressRoutesAdapter.adapt(makeFinishShareRequestController()),
);
