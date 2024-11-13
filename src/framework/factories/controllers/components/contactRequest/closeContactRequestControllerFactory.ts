import { CloseContactRequestController } from "@controllers/components/contactRequest/closeContactRequestController";
import { makeCloseContactRequestOperator } from "../../operators/contactRequest/closeContactRequestOperatorFactory";

export const makeCloseContactRequestController = (): CloseContactRequestController => {
	return new CloseContactRequestController(makeCloseContactRequestOperator());
};
