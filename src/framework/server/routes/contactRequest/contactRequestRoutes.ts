import { makeCloseContactRequestController } from "@framework/factories/controllers/components/contactRequest/closeContactRequestControllerFactory";
import { makeCreateContactRequestController } from "@framework/factories/controllers/components/contactRequest/createContactRequestControllerFactory";
import { makeFindLandlordContactRequestsController } from "@framework/factories/controllers/components/contactRequest/findLandlordContactRequestsControllerFactory";
import { makeRentPropertyController } from "@framework/factories/controllers/components/contactRequest/rentPropertyControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { landlordGuard } from "@framework/server/middlewares/guards";
import { Router } from "express";

export const contactRequestRoutes = Router();

contactRequestRoutes.post("/contact-requests", ExpressRoutesAdapter.adapt(makeCreateContactRequestController()));
contactRequestRoutes.get(
	"/contact-requests",
	landlordGuard,
	ExpressRoutesAdapter.adapt(makeFindLandlordContactRequestsController()),
);
contactRequestRoutes.post("/contact-requests/rent", ExpressRoutesAdapter.adapt(makeRentPropertyController()));
contactRequestRoutes.post("/contact-requests/close", ExpressRoutesAdapter.adapt(makeCloseContactRequestController()));
