import { CreateLandlordController } from "@controllers/components/landlord/createLandlordController";
import { makeCreatelandlordOperator } from "../../operators/landlord/createLandlordOperatorFactory";

export const makeCreateLandlordController = (): CreateLandlordController => {
	return new CreateLandlordController(makeCreatelandlordOperator());
};
