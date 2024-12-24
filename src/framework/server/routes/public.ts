import { makeCreateLandlordController } from "@framework/factories/controllers/components/landlord/createLandlordControllerFactory";
import { makeCreateTenantController } from "@framework/factories/controllers/components/tenant/createTenantControllerFactory";
import { Router } from "express";
import { ExpressRoutesAdapter } from "../adapters/expressRoutesAdapter";
import { authRoutes } from "./auth/authRoutes";

export const publicRoutes = Router();

publicRoutes.use(authRoutes);

publicRoutes.post("/tenants", ExpressRoutesAdapter.adapt(makeCreateTenantController()));
publicRoutes.post("/landlords", ExpressRoutesAdapter.adapt(makeCreateLandlordController()));
