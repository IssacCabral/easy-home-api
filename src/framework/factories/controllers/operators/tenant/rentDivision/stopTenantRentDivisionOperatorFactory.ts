import { StopTenantRentDivisionOperator } from "@controllers/operators/tenant/rentDivision/stopTenantRentDivisionOperator";
import { makeStopTenantRentDivisionUseCase } from "@framework/factories/usecases/tenant/rentDivision/stopTenantRentDivisionUseCaseFactory";

export const makeStopTenantRentDivisionOperator = (): StopTenantRentDivisionOperator => {
	return new StopTenantRentDivisionOperator(makeStopTenantRentDivisionUseCase());
};
