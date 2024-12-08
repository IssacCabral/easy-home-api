import { makeGetDashboardSummaryController } from "@framework/factories/controllers/components/landlord/getDashboardSummaryFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { Router } from "express";

export const landlordRoutes = Router();

landlordRoutes.get("/landlords/dashboard/:landlordId", ExpressRoutesAdapter.adapt(makeGetDashboardSummaryController()));
