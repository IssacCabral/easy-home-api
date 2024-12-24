import type { CreateShareRequestUseCase } from "@business/usecases/tenant/shareRequest/createShareRequestUseCase";
import { AbstractOperator } from "@controllers/operators/abstractOperator";
import type {
	InputCreateShareRequestSerializer,
	OutputCreateShareRequestSerializer,
} from "@controllers/serializers/tenant/shareRequest/createShareRequestSerializer";

export class CreateShareRequestOperator extends AbstractOperator<
	InputCreateShareRequestSerializer,
	OutputCreateShareRequestSerializer
> {
	constructor(private readonly createShareRequestUseCase: CreateShareRequestUseCase) {
		super();
	}

	protected async run(input: InputCreateShareRequestSerializer): Promise<OutputCreateShareRequestSerializer> {
		return await this.createShareRequestUseCase.exec(input);
	}
}
