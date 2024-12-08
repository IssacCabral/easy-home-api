import { makeGetAllAmenitiesController } from "@framework/factories/controllers/components/amenity/getAllAmenitiesControllerFactory";
import { makeAuthMiddleware } from "@framework/factories/middlewares/authMiddlewareFactory";
import { ExpressMiddlewareAdapter } from "@framework/server/adapters/expressMiddlewareAdapter";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { Router } from "express";

export const amenityRoutes = Router();

amenityRoutes.get(
	"/amenities",
	ExpressMiddlewareAdapter.adapt(makeAuthMiddleware()),
	ExpressRoutesAdapter.adapt(makeGetAllAmenitiesController()),
);
