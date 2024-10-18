import { makeGetAllAmenitiesController } from "@framework/factories/controllers/components/amenity/getAllAmenitiesControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { Router } from "express";

export const amenityRoutes = Router();

amenityRoutes.get("/amenities", ExpressRoutesAdapter.adapt(makeGetAllAmenitiesController()));
