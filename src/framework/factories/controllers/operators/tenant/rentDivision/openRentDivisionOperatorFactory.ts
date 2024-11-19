import { OpenRentDivisionOperator } from "@controllers/operators/tenant/rentDivision/openRentDivisionOperator";
import { makeOpenRentDivisionUseCase } from "@framework/factories/usecases/tenant/rentDivision/openRentDivisionUseCaseFactory";

export const makeOpenRentDivisionOperator = (): OpenRentDivisionOperator => {
	return new OpenRentDivisionOperator(makeOpenRentDivisionUseCase());
};
