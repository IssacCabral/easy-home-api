import type { FindShareRequestsUseCase } from "@business/usecases/tenant/shareRequest/findShareRequestsUseCase";
import { AbstractOperator } from "@controllers/operators/abstractOperator";
import type {
	InputFindShareRequestsSerializer,
	OutputFindShareRequestsSerializer,
} from "@controllers/serializers/tenant/shareRequest/findShareRequestsSerializer";

export class FindShareRequestsOperator extends AbstractOperator<
	InputFindShareRequestsSerializer,
	OutputFindShareRequestsSerializer
> {
	constructor(private readonly useCase: FindShareRequestsUseCase) {
		super();
	}

	protected async run(input: InputFindShareRequestsSerializer): Promise<OutputFindShareRequestsSerializer> {
		return this.useCase.exec(input);
	}
}
