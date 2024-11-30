import { makeCreateShareRequestController } from "@framework/factories/controllers/components/tenant/shareRequest/createShareRequestControllerFactory";
import { makeSelectShareRequestController } from "@framework/factories/controllers/components/tenant/shareRequest/selectShareRequestControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { Router } from "express";

export const shareRequestRoutes = Router();

shareRequestRoutes.post("/share-requests", ExpressRoutesAdapter.adapt(makeCreateShareRequestController()));
shareRequestRoutes.patch("/share-requests/select/:id", ExpressRoutesAdapter.adapt(makeSelectShareRequestController()));
// shareRequestRoutes.patch("/share-requests/close/:id", ExpressRoutesAdapter.adapt(makeCloseShareRequestController()));
