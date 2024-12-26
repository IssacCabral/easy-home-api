import { FindPropertiesOfInterestController } from "@controllers/components/tenant/findPropertiesOfInterestController";
import { makeFindPropertiesOfInterestOperator } from "../../operators/tenant/findPropertiesOfInterestOperatorFactory";

export const makeFindPropertiesOfInterestController = (): FindPropertiesOfInterestController => {
	return new FindPropertiesOfInterestController(makeFindPropertiesOfInterestOperator());
};
