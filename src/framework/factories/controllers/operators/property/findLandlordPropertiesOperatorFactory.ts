import { FindLandlordPropertiesOperator } from "@controllers/operators/property/findLandlordPropertiesOperator";
import { makeFindLandlordPropertiesUseCase } from "@framework/factories/usecases/property/findLandlordPropertiesUseCaseFactory";

export const makeFindLandlordPropertiesOperator = (): FindLandlordPropertiesOperator => {
	return new FindLandlordPropertiesOperator(makeFindLandlordPropertiesUseCase());
};
