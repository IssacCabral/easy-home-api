import { FindPropertyController } from "@controllers/components/property/findPropertyController";
import { makeFindPropertyOperator } from "../../operators/property/findPropertyOperatorFactory";

export const makeFindPropertyController = (): FindPropertyController => {
	return new FindPropertyController(makeFindPropertyOperator());
};
