import { CreateContactRequestOperator } from "@controllers/operators/contactRequest/createContactRequestOperator";
import { makeCreateContactRequestUseCase } from "@framework/factories/usecases/contactRequest/createContactRequestUseCaseFactory";

export const makeCreateContactRequestOperator = (): CreateContactRequestOperator => {
	return new CreateContactRequestOperator(makeCreateContactRequestUseCase());
};
