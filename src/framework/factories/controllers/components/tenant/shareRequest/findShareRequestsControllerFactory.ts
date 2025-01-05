import { FindShareRequestsController } from "@controllers/components/tenant/shareRequest/findShareRequestsController";
import { makeFindShareRequestsOperator } from "@framework/factories/controllers/operators/tenant/shareRequest/findShareRequestsOperatorFactory";

export const makeFindShareRequestsController = (): FindShareRequestsController => {
	return new FindShareRequestsController(makeFindShareRequestsOperator());
};
