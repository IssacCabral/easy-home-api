import { FindPropertyReviewsController } from "@controllers/components/propertyReview/findPropertyReviewsController";
import { makeFindPropertyReviewsOperator } from "../../operators/propertyReview/findPropertyReviewsOperatorFactory";

export const makeFindPropertyReviewsController = (): FindPropertyReviewsController => {
	return new FindPropertyReviewsController(makeFindPropertyReviewsOperator());
};
