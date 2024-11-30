import { CreateShareRequestOperator } from "@controllers/operators/tenant/shareRequest/createShareRequestOperator";
import { makeCreateShareRequestUseCase } from "@framework/factories/usecases/tenant/shareRequest/createShareRequestUseCaseFactory";

export const makeCreateShareRequestOperator = (): CreateShareRequestOperator => {
	return new CreateShareRequestOperator(makeCreateShareRequestUseCase());
};
