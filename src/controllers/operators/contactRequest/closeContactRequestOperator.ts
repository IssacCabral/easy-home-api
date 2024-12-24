import type { CloseContactRequestUseCase } from "@business/usecases/contactRequest/closeContactRequestUseCase";
import type {
	InputCloseContactRequestSerializer,
	OutputCloseContactRequestSerializer,
} from "@controllers/serializers/contactRequest/closeContactRequestSerializer";
import { AbstractOperator } from "../abstractOperator";

export class CloseContactRequestOperator extends AbstractOperator<
	InputCloseContactRequestSerializer,
	OutputCloseContactRequestSerializer
> {
	constructor(private readonly closeContactRequestUseCase: CloseContactRequestUseCase) {
		super();
	}

	protected async run(input: InputCloseContactRequestSerializer): Promise<OutputCloseContactRequestSerializer> {
		return await this.closeContactRequestUseCase.exec(input);
	}
}
