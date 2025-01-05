import { FindShareRequestsOperator } from "@controllers/operators/tenant/shareRequest/findShareRequestsOperator";
import { makeFindShareRequestsUseCase } from "@framework/factories/usecases/tenant/shareRequest/findShareRequestsUseCaseFactory";

export const makeFindShareRequestsOperator = (): FindShareRequestsOperator => {
	return new FindShareRequestsOperator(makeFindShareRequestsUseCase());
};
