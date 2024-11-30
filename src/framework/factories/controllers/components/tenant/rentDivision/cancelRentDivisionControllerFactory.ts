import { CancelRentDivisionController } from "@controllers/components/tenant/rentDivision/cancelRentDivisionController";
import { makeCancelRentDivisionOperator } from "@framework/factories/controllers/operators/tenant/rentDivision/cancelRentDivisionOperatorFactory";

export const makeCancelRentDivisionController = (): CancelRentDivisionController => {
	return new CancelRentDivisionController(makeCancelRentDivisionOperator());
};
