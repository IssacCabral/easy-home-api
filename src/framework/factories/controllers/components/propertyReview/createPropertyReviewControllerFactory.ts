import { CreatePropertyReviewController } from "@controllers/components/propertyReview/createPropertyReviewController";
import { makeCreatePropertyReviewOperator } from "../../operators/propertyReview/createPropertyReviewOperatorFactory";

export const makeCreatePropertyReviewController = (): CreatePropertyReviewController => {
	return new CreatePropertyReviewController(makeCreatePropertyReviewOperator());
};
