import type {
	InputCreatePropertySerializer,
	OutputCreatePropertySerializer,
} from "@controllers/serializers/property/createPropertySerializer";
import { AbstractOperator } from "../abstractOperator";
import type { CreatePropertyUseCase } from "@business/usecases/property/createPropertyUseCase";

export class CreatePropertyOperator extends AbstractOperator<
	InputCreatePropertySerializer,
	OutputCreatePropertySerializer
> {
	constructor(private readonly createPropertyUseCase: CreatePropertyUseCase) {
		super();
	}

	protected async run(input: InputCreatePropertySerializer): Promise<OutputCreatePropertySerializer> {
		return await this.createPropertyUseCase.exec(input);
	}
}
