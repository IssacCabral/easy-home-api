import { makeCreateLandlordController } from "@framework/factories/controllers/components/landlord/createLandlordControllerFactory";
import { makeGetDashboardSummaryController } from "@framework/factories/controllers/components/landlord/getDashboardSummaryFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { Router } from "express";

export const landlordRoutes = Router();

landlordRoutes.post("/landlords", ExpressRoutesAdapter.adapt(makeCreateLandlordController()));
landlordRoutes.get("/landlords/dashboard/:landlordId", ExpressRoutesAdapter.adapt(makeGetDashboardSummaryController()));
