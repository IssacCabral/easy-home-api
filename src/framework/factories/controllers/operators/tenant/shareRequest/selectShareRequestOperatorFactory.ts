import { SelectShareRequestOperator } from "@controllers/operators/tenant/shareRequest/selectShareRequestOperator";
import { makeSelectShareRequestUseCase } from "@framework/factories/usecases/tenant/shareRequest/selectShareRequestUseCaseFactory";

export const makeSelectShareRequestOperator = (): SelectShareRequestOperator => {
	return new SelectShareRequestOperator(makeSelectShareRequestUseCase());
};
