import { FindLandlordPropertiesController } from "@controllers/components/property/findLandlordPropertiesController";
import { makeFindLandlordPropertiesOperator } from "../../operators/property/findLandlordPropertiesOperatorFactory";

export const makeFindLandlordPropertiesController = (): FindLandlordPropertiesController => {
	return new FindLandlordPropertiesController(makeFindLandlordPropertiesOperator());
};
