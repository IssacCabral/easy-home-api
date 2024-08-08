import { makeCreateTenantController } from "@framework/factories/controllers/components/tenant/createTenantControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { Router } from "express";

export const tenantRoutes = Router();

tenantRoutes.post("/tenants", ExpressRoutesAdapter.adapt(makeCreateTenantController()));
