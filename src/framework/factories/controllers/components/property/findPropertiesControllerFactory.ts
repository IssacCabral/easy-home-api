import { FindPropertiesController } from "@controllers/components/property/findPropertiesController";
import { makeFindPropertiesOperator } from "../../operators/property/findPropertiesOperatorFactory";

export const makeFindPropertiesController = (): FindPropertiesController => {
	return new FindPropertiesController(makeFindPropertiesOperator());
};
