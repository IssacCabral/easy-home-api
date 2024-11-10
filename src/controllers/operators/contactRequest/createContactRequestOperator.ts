import type {
	InputCreateContactRequestSerializer,
	OutputCreateContactRequestSerializer,
} from "@controllers/serializers/contactRequest/createContactRequestSerializer";
import { AbstractOperator } from "../abstractOperator";
import type { CreateContactRequestUseCase } from "@business/usecases/contactRequest/createContactRequestUseCase";

export class CreateContactRequestOperator extends AbstractOperator<
	InputCreateContactRequestSerializer,
	OutputCreateContactRequestSerializer
> {
	constructor(private readonly createContactRequestUseCase: CreateContactRequestUseCase) {
		super();
	}

	protected async run(input: InputCreateContactRequestSerializer): Promise<OutputCreateContactRequestSerializer> {
		return await this.createContactRequestUseCase.exec(input);
	}
}
