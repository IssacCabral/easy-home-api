import { FindPropertyOperator } from "@controllers/operators/property/findPropertyOperator";
import { makeFindPropertyUseCase } from "@framework/factories/usecases/property/findPropertyUseCaseFactory";

export const makeFindPropertyOperator = (): FindPropertyOperator => {
	return new FindPropertyOperator(makeFindPropertyUseCase());
};
