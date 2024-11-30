import { CompleteRentDivisionController } from "@controllers/components/tenant/rentDivision/completeRentDivisionController";
import { makeCompleteRentDivisionOperator } from "@framework/factories/controllers/operators/tenant/rentDivision/completeRentDivisionOperatorFactory";

export const makeCompleteRentDivisionController = (): CompleteRentDivisionController => {
	return new CompleteRentDivisionController(makeCompleteRentDivisionOperator());
};
