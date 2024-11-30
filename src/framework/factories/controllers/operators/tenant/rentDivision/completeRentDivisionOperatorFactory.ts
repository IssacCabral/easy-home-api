import { CompleteRentDivisionOperator } from "@controllers/operators/tenant/rentDivision/completeRentDivisionOperator";
import { makeCompleteRentDivisionUseCase } from "@framework/factories/usecases/tenant/rentDivision/completeRentDivisionUseCaseFactory";

export const makeCompleteRentDivisionOperator = (): CompleteRentDivisionOperator => {
	return new CompleteRentDivisionOperator(makeCompleteRentDivisionUseCase());
};
