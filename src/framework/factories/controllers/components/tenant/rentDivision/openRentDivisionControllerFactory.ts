import { OpenRentDivisionController } from "@controllers/components/tenant/rentDivision/openRentDivisionController";
import { makeOpenRentDivisionOperator } from "@framework/factories/controllers/operators/tenant/rentDivision/openRentDivisionOperatorFactory";

export const makeOpenRentDivisionController = (): OpenRentDivisionController => {
	return new OpenRentDivisionController(makeOpenRentDivisionOperator());
};
