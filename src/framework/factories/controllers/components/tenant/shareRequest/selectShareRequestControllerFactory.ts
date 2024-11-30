import { SelectShareRequestController } from "@controllers/components/tenant/shareRequest/selectShareRequestController";
import { makeSelectShareRequestOperator } from "@framework/factories/controllers/operators/tenant/shareRequest/selectShareRequestOperatorFactory";

export const makeSelectShareRequestController = (): SelectShareRequestController => {
	return new SelectShareRequestController(makeSelectShareRequestOperator());
};
