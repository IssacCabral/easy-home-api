import { FindLandlordContactRequestsOperator } from "@controllers/operators/contactRequest/findLandlordContactRequestsOperator";
import { makeFindLandlordContactRequestsUseCase } from "@framework/factories/usecases/contactRequest/findLandlordContactRequestsUseCaseFactory";

export const makeFindLandlordContactRequestsOperator = (): FindLandlordContactRequestsOperator => {
	return new FindLandlordContactRequestsOperator(makeFindLandlordContactRequestsUseCase());
};
