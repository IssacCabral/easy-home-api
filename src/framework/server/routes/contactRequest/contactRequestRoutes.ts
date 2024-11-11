import { makeCreateContactRequestController } from "@framework/factories/controllers/components/contactRequest/createContactRequestControllerFactory";
import { makeFindLandlordContactRequestsController } from "@framework/factories/controllers/components/contactRequest/findLandlordContactRequestsControllerFactory";
import { makeRentPropertyController } from "@framework/factories/controllers/components/contactRequest/rentPropertyControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { Router } from "express";

export const contactRequestRoutes = Router();

contactRequestRoutes.post("/contact-requests", ExpressRoutesAdapter.adapt(makeCreateContactRequestController()));
contactRequestRoutes.get(
	"/contact-requests/:landlordId",
	ExpressRoutesAdapter.adapt(makeFindLandlordContactRequestsController()),
);
contactRequestRoutes.post("/contact-requests/rent", ExpressRoutesAdapter.adapt(makeRentPropertyController()));
