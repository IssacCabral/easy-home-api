import { CreateLandlordOperator } from "@controllers/operators/landlord/createLandlordOperator";
import { makeCreatelandlordUseCase } from "@framework/factories/usecases/landlord/createLandlordUseCaseFactory";

export const makeCreatelandlordOperator = (): CreateLandlordOperator => {
	return new CreateLandlordOperator(makeCreatelandlordUseCase());
};
