import { CreateTenantController } from "@controllers/components/tenant/createTenantController";
import { makeCreateTenantOperator } from "../../operators/tenant/createTenantOperatorFactory";

export const makeCreateTenantController = (): CreateTenantController => {
	return new CreateTenantController(makeCreateTenantOperator());
};
