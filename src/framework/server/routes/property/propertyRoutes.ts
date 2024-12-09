import { makeCreatePropertyController } from "@framework/factories/controllers/components/property/createPropertyControllerFactory";
import { makeFindLandlordPropertiesController } from "@framework/factories/controllers/components/property/findLandlordPropertiesControllerFactory";
import { makeFindPropertiesController } from "@framework/factories/controllers/components/property/findPropertiesControllerFactory";
import { makeFindPropertyController } from "@framework/factories/controllers/components/property/findPropertyControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { landlordGuard, tenantGuard } from "@framework/server/middlewares/guards";
import { Router } from "express";

export const propertyRoutes = Router();

propertyRoutes.post("/properties", landlordGuard, ExpressRoutesAdapter.adapt(makeCreatePropertyController()));
propertyRoutes.get("/properties", tenantGuard, ExpressRoutesAdapter.adapt(makeFindPropertiesController()));
propertyRoutes.get("/properties/:id", tenantGuard, ExpressRoutesAdapter.adapt(makeFindPropertyController()));
propertyRoutes.get(
	"/properties/landlord/list",
	landlordGuard,
	ExpressRoutesAdapter.adapt(makeFindLandlordPropertiesController()),
);
