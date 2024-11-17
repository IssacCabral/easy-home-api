import { FindPropertyReviewsOperator } from "@controllers/operators/propertyReview/findPropertyReviewsOperator";
import { makeFindPropertyReviewsUseCase } from "@framework/factories/usecases/propertyReview/findPropertyReviewUseCaseFactory";

export const makeFindPropertyReviewsOperator = (): FindPropertyReviewsOperator => {
	return new FindPropertyReviewsOperator(makeFindPropertyReviewsUseCase());
};
