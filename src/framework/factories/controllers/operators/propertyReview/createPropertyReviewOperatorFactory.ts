import { CreatePropertyReviewOperator } from "@controllers/operators/propertyReview/createPropertyReviewOperator";
import { makeCreatePropertyReviewUseCase } from "@framework/factories/usecases/propertyReview/createPropertyReviewUseCaseFactory";

export const makeCreatePropertyReviewOperator = (): CreatePropertyReviewOperator => {
	return new CreatePropertyReviewOperator(makeCreatePropertyReviewUseCase());
};
