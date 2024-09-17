import { makeCreatePropertyController } from "@framework/factories/controllers/components/property/createPropertyControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { Router } from "express";

export const propertyRoutes = Router();

propertyRoutes.post("/properties", ExpressRoutesAdapter.adapt(makeCreatePropertyController()));
