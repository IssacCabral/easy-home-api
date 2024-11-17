import { FindPropertyRatingOperator } from "@controllers/operators/propertyReview/findPropertyRatingOperator";
import { makeFindPropertyRatingUseCase } from "@framework/factories/usecases/propertyReview/findPropertyRatingUseCaseFactory";

export const makeFindPropertyRatingOperator = (): FindPropertyRatingOperator => {
	return new FindPropertyRatingOperator(makeFindPropertyRatingUseCase());
};
