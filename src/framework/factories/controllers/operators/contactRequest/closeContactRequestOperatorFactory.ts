import { CloseContactRequestOperator } from "@controllers/operators/contactRequest/closeContactRequestOperator";
import { makeCloseContactRequestUseCase } from "@framework/factories/usecases/contactRequest/closeContactRequestUseCaseFactory";

export const makeCloseContactRequestOperator = (): CloseContactRequestOperator => {
	return new CloseContactRequestOperator(makeCloseContactRequestUseCase());
};
