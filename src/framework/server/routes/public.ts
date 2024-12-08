import { Router } from "express";
import { authRoutes } from "./auth/authRoutes";
import { ExpressRoutesAdapter } from "../adapters/expressRoutesAdapter";
import { makeCreateTenantController } from "@framework/factories/controllers/components/tenant/createTenantControllerFactory";
import { makeCreateLandlordController } from "@framework/factories/controllers/components/landlord/createLandlordControllerFactory";

export const publicRoutes = Router();

publicRoutes.use(authRoutes);

publicRoutes.post("/tenants", ExpressRoutesAdapter.adapt(makeCreateTenantController()));
publicRoutes.post("/landlords", ExpressRoutesAdapter.adapt(makeCreateLandlordController()));
