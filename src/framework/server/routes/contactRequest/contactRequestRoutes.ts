import { makeCreateContactRequestController } from "@framework/factories/controllers/components/contactRequest/createContactRequestControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { Router } from "express";

export const contactRequestRoutes = Router();

contactRequestRoutes.post("/contact-requests", ExpressRoutesAdapter.adapt(makeCreateContactRequestController()));
