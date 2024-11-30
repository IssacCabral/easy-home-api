import { FindSharedRentalTenantsController } from "@controllers/components/tenant/rentDivision/findSharedRentalTenantsController";
import { makeFindSharedRentalTenantsOperator } from "@framework/factories/controllers/operators/tenant/rentDivision/findSharedRentalTenantsOperatorFactory";

export const makeFindSharedRentalTenantsController = (): FindSharedRentalTenantsController => {
	return new FindSharedRentalTenantsController(makeFindSharedRentalTenantsOperator());
};
