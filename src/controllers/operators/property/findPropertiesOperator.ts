import type { FindPropertiesUseCase } from "@business/usecases/property/findPropertiesUseCase";
import type {
	InputFindPropertiesSerializer,
	OutputFindPropertiesSerializer,
} from "@controllers/serializers/property/findPropertiesSerializer";
import { AbstractOperator } from "../abstractOperator";

export class FindPropertiesOperator extends AbstractOperator<
	InputFindPropertiesSerializer,
	OutputFindPropertiesSerializer
> {
	constructor(private readonly findPropertiesUseCase: FindPropertiesUseCase) {
		super();
	}

	protected async run(input: InputFindPropertiesSerializer): Promise<OutputFindPropertiesSerializer> {
		return await this.findPropertiesUseCase.exec(input);
	}
}
