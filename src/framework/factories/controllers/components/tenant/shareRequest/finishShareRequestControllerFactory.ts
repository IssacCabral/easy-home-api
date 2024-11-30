import { FinishShareRequestController } from "@controllers/components/tenant/shareRequest/finishShareRequestController";
import { makeFinishShareRequestOperator } from "@framework/factories/controllers/operators/tenant/shareRequest/finishShareRequestOperatorFactory";

export const makeFinishShareRequestController = (): FinishShareRequestController => {
	return new FinishShareRequestController(makeFinishShareRequestOperator());
};
