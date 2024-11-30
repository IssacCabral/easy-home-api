import { CancelRentDivisionOperator } from "@controllers/operators/tenant/rentDivision/cancelRentDivisionOperator";
import { makeCancelRentDivisionUseCase } from "@framework/factories/usecases/tenant/rentDivision/cancelRentDivisionUseCaseFactory";

export const makeCancelRentDivisionOperator = (): CancelRentDivisionOperator => {
	return new CancelRentDivisionOperator(makeCancelRentDivisionUseCase());
};
