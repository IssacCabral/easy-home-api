import { FindPropertyRatingController } from "@controllers/components/propertyReview/findPropertyRatingController";
import { makeFindPropertyRatingOperator } from "../../operators/propertyReview/findPropertyRatingOperatorFactory";

export const makeFindPropertyRatingController = (): FindPropertyRatingController => {
	return new FindPropertyRatingController(makeFindPropertyRatingOperator());
};
