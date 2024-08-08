import type {
	InputCreateTenantSerializer,
	OutputCreateTenantSerializer,
} from "@controllers/serializers/tenant/createTenantSerializer";
import { AbstractOperator } from "../abstractOperator";
import type { CreateTenantUseCase } from "@business/usecases/tenant/createTenantUseCase";

export class CreateTenantOperator extends AbstractOperator<InputCreateTenantSerializer, OutputCreateTenantSerializer> {
	constructor(private readonly createTenantUseCase: CreateTenantUseCase) {
		super();
	}

	protected async run(input: InputCreateTenantSerializer): Promise<OutputCreateTenantSerializer> {
		return await this.createTenantUseCase.exec(input);
	}
}
