import type {} from "@controllers/serializers/contactRequest/createContactRequestSerializer";
import type {} from "@controllers/serializers/tenant/shareRequest/selectShareRequestSerializer";
import { AbstractOperator } from "@controllers/operators/abstractOperator";
import type {
	InputFinishShareRequestSerializer,
	OutputFinishShareRequestSerializer,
} from "@controllers/serializers/tenant/shareRequest/finishShareRequestSerializer";
import type { FinishShareRequestUseCase } from "@business/usecases/tenant/shareRequest/finishShareRequestUseCase";

export class FinishShareRequestOperator extends AbstractOperator<
	InputFinishShareRequestSerializer,
	OutputFinishShareRequestSerializer
> {
	constructor(private readonly finishShareRequestUseCase: FinishShareRequestUseCase) {
		super();
	}

	protected async run(input: InputFinishShareRequestSerializer): Promise<OutputFinishShareRequestSerializer> {
		return await this.finishShareRequestUseCase.exec(input);
	}
}