import { FindPropertiesOfInterestOperator } from "@controllers/operators/tenant/findPropertiesOfInterestOperator";
import { makeFindPropertiesOfInterestUseCase } from "@framework/factories/usecases/tenant/findPropertiesOfInterestUseCaseFactory";

export const makeFindPropertiesOfInterestOperator = (): FindPropertiesOfInterestOperator => {
	return new FindPropertiesOfInterestOperator(makeFindPropertiesOfInterestUseCase());
};
