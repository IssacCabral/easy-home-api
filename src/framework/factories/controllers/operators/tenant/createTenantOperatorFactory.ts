import { CreateTenantOperator } from "@controllers/operators/tenant/createTenantOperator";
import { makeCreateTenantUseCase } from "@framework/factories/usecases/tenant/createTenantUseCaseFactory";

export const makeCreateTenantOperator = (): CreateTenantOperator => {
	return new CreateTenantOperator(makeCreateTenantUseCase());
};
