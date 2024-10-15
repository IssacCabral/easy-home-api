import { FindPropertiesOperator } from "@controllers/operators/property/findPropertiesOperator";
import { makeFindPropertiesUseCase } from "@framework/factories/usecases/property/findPropertiesUseCaseFactory";

export const makeFindPropertiesOperator = (): FindPropertiesOperator => {
	return new FindPropertiesOperator(makeFindPropertiesUseCase());
};
