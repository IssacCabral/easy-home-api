import { CreateShareRequestController } from "@controllers/components/tenant/shareRequest/createShareRequestController";
import { makeCreateShareRequestOperator } from "@framework/factories/controllers/operators/tenant/shareRequest/createShareRequestOperatorFactory";

export const makeCreateShareRequestController = (): CreateShareRequestController => {
	return new CreateShareRequestController(makeCreateShareRequestOperator());
};
