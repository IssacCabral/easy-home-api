import { RentPropertyOperator } from "@controllers/operators/contactRequest/rentPropertyOperator";
import { makeRentPropertyUseCase } from "@framework/factories/usecases/contactRequest/rentPropertyUseCaseFactory";

export const makeRentPropertyOperator = (): RentPropertyOperator => {
	return new RentPropertyOperator(makeRentPropertyUseCase());
};
