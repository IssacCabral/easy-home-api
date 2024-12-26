import type { FindPropertiesOfInterestUseCase } from "@business/usecases/tenant/findPropertiesOfInterestUseCase";
import type {
	InputFindPropertiesOfInterestSerializer,
	OutputFindPropertiesOfInterestSerializer,
} from "@controllers/serializers/tenant/findPropertiesOfInterestSerializer";
import { AbstractOperator } from "../abstractOperator";

export class FindPropertiesOfInterestOperator extends AbstractOperator<
	InputFindPropertiesOfInterestSerializer,
	OutputFindPropertiesOfInterestSerializer
> {
	constructor(private readonly usecase: FindPropertiesOfInterestUseCase) {
		super();
	}

	protected async run(
		input: InputFindPropertiesOfInterestSerializer,
	): Promise<OutputFindPropertiesOfInterestSerializer> {
		return this.usecase.exec(input);
	}
}
