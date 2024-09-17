import { CreatePropertyController } from "@controllers/components/property/createPropertyController";
import { makeCreatePropertyOperator } from "../../operators/property/createPropertyOperatorFactory";

export const makeCreatePropertyController = (): CreatePropertyController => {
	return new CreatePropertyController(makeCreatePropertyOperator());
};
