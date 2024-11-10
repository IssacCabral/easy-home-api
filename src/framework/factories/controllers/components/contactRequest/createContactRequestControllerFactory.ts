import { CreateContactRequestController } from "@controllers/components/contactRequest/createContactRequestController";
import { makeCreateContactRequestOperator } from "../../operators/contactRequest/createContactRequestOperatorFactory";

export const makeCreateContactRequestController = (): CreateContactRequestController => {
	return new CreateContactRequestController(makeCreateContactRequestOperator());
};
