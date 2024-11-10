import type { FindPropertyUseCase } from "@business/usecases/property/findPropertyUseCase";
import type {
	InputFindPropertySerializer,
	OutputFindPropertySerializer,
} from "@controllers/serializers/property/findPropertySerializer";
import { AbstractOperator } from "../abstractOperator";

export class FindPropertyOperator extends AbstractOperator<InputFindPropertySerializer, OutputFindPropertySerializer> {
	constructor(private readonly findPropertyUseCase: FindPropertyUseCase) {
		super();
	}

	protected async run(input: InputFindPropertySerializer): Promise<OutputFindPropertySerializer> {
		return await this.findPropertyUseCase.exec(input);
	}
}
