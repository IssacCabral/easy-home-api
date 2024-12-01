import { StopTenantRentDivisionController } from "@controllers/components/tenant/rentDivision/stopTenantRentDivisionController";
import { makeStopTenantRentDivisionOperator } from "@framework/factories/controllers/operators/tenant/rentDivision/stopTenantRentDivisionOperatorFactory";

export const makeStopTenantRentDivisionController = (): StopTenantRentDivisionController => {
	return new StopTenantRentDivisionController(makeStopTenantRentDivisionOperator());
};
