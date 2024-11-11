import { RentPropertyController } from "@controllers/components/contactRequest/rentPropertyController";
import { makeRentPropertyOperator } from "../../operators/contactRequest/rentPropertyOperatorFactory";

export const makeRentPropertyController = (): RentPropertyController => {
	return new RentPropertyController(makeRentPropertyOperator());
};
