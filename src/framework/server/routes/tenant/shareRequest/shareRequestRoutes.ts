import { makeCreateShareRequestController } from "@framework/factories/controllers/components/tenant/shareRequest/createShareRequestControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { Router } from "express";

export const shareRequestRoutes = Router();

shareRequestRoutes.post("/share-request/create", ExpressRoutesAdapter.adapt(makeCreateShareRequestController()));
