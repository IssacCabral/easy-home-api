import { FindLandlordContactRequestsController } from "@controllers/components/contactRequest/findLandlordContactRequestsController";
import { makeFindLandlordContactRequestsOperator } from "../../operators/contactRequest/findLandlordContactRequestsOperatorFactory";

export const makeFindLandlordContactRequestsController = (): FindLandlordContactRequestsController => {
	return new FindLandlordContactRequestsController(makeFindLandlordContactRequestsOperator());
};
