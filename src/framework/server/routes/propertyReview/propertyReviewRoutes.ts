import { makeCreatePropertyReviewController } from "@framework/factories/controllers/components/propertyReview/createPropertyReviewControllerFactory";
import { makeFindPropertyRatingController } from "@framework/factories/controllers/components/propertyReview/findPropertyRatingControllerFactory";
import { makeFindPropertyReviewsController } from "@framework/factories/controllers/components/propertyReview/findPropertyReviewsControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { tenantGuard } from "@framework/server/middlewares/guards";
import { Router } from "express";

export const propertyReviewRoutes = Router();

propertyReviewRoutes.post(
	"/property-reviews",
	tenantGuard,
	ExpressRoutesAdapter.adapt(makeCreatePropertyReviewController()),
);
propertyReviewRoutes.get(
	"/property-reviews/rating/:propertyId",
	ExpressRoutesAdapter.adapt(makeFindPropertyRatingController()),
);
propertyReviewRoutes.get(
	"/property-reviews/:propertyId",
	ExpressRoutesAdapter.adapt(makeFindPropertyReviewsController()),
);
