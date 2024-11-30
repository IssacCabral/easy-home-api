import { FinishShareRequestOperator } from "@controllers/operators/tenant/shareRequest/finishShareRequestOperator";
import { makeFinishShareRequestUseCase } from "@framework/factories/usecases/tenant/shareRequest/finishShareRequestUseCaseFactory";

export const makeFinishShareRequestOperator = (): FinishShareRequestOperator => {
	return new FinishShareRequestOperator(makeFinishShareRequestUseCase());
};
