import { makeCreateLandlordController } from "@framework/factories/controllers/components/landlord/createLandlordControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { Router } from "express";

export const landlordRoutes = Router();

landlordRoutes.post("/landlords", ExpressRoutesAdapter.adapt(makeCreateLandlordController()));
