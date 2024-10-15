import type { CreatePropertyUseCase } from "@business/usecases/property/createPropertyUseCase";
import type {
	InputCreatePropertySerializer,
	OutputCreatePropertySerializer,
} from "@controllers/serializers/property/createPropertySerializer";
import { AbstractOperator } from "../abstractOperator";

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
