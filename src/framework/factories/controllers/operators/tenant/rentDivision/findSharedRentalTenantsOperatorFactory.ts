import { FindSharedRentalTenantsOperator } from "@controllers/operators/tenant/rentDivision/findSharedRentalTenantsOperator";
import { makeFindSharedRentalTenantsUseCase } from "@framework/factories/usecases/tenant/rentDivision/findSharedRentalTenantsUseCaseFactory";

export const makeFindSharedRentalTenantsOperator = (): FindSharedRentalTenantsOperator => {
	return new FindSharedRentalTenantsOperator(makeFindSharedRentalTenantsUseCase());
};
