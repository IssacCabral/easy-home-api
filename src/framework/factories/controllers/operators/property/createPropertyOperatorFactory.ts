import { CreatePropertyOperator } from "@controllers/operators/property/createPropertyOperator";
import { makeCreatePropertyUseCase } from "@framework/factories/usecases/property/createPropertyUseCaseFactory";

export const makeCreatePropertyOperator = (): CreatePropertyOperator => {
	return new CreatePropertyOperator(makeCreatePropertyUseCase());
};
