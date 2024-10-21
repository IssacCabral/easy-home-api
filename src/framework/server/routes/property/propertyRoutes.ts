import { makeCreatePropertyController } from "@framework/factories/controllers/components/property/createPropertyControllerFactory";
import { makeFindPropertiesController } from "@framework/factories/controllers/components/property/findPropertiesControllerFactory";
import { makeFindPropertyController } from "@framework/factories/controllers/components/property/findPropertyControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { Router } from "express";

export const propertyRoutes = Router();

propertyRoutes.post("/properties", ExpressRoutesAdapter.adapt(makeCreatePropertyController()));
propertyRoutes.get("/properties", ExpressRoutesAdapter.adapt(makeFindPropertiesController()));
propertyRoutes.get("/properties/:id", ExpressRoutesAdapter.adapt(makeFindPropertyController()));
