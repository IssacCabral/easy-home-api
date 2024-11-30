import type {} from "@controllers/serializers/contactRequest/createContactRequestSerializer";
import type {
	InputSelectShareRequestSerializer,
	OutputSelectShareRequestSerializer,
} from "@controllers/serializers/tenant/shareRequest/selectShareRequestSerializer";
import type { SelectShareRequestUseCase } from "@business/usecases/tenant/shareRequest/selectShareRequestUseCase";
import { AbstractOperator } from "@controllers/operators/abstractOperator";

export class SelectShareRequestOperator extends AbstractOperator<
	InputSelectShareRequestSerializer,
	OutputSelectShareRequestSerializer
> {
	constructor(private readonly selectShareRequestUseCase: SelectShareRequestUseCase) {
		super();
	}

	protected async run(input: InputSelectShareRequestSerializer): Promise<OutputSelectShareRequestSerializer> {
		return await this.selectShareRequestUseCase.exec(input);
	}
}
