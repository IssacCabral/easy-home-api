import type {
	InputFindLandlordPropertiesSerializer,
	OutputFindLandlordPropertiesSerializer,
} from "@controllers/serializers/property/findLandlordPropertiesSerializer";
import { AbstractOperator } from "../abstractOperator";
import type { FindLandlordPropertiesUseCase } from "@business/usecases/property/findLandlordPropertiesUseCase";

export class FindLandlordPropertiesOperator extends AbstractOperator<
	InputFindLandlordPropertiesSerializer,
	OutputFindLandlordPropertiesSerializer
> {
	constructor(private readonly findLandlordPropertiesUseCase: FindLandlordPropertiesUseCase) {
		super();
	}

	protected async run(input: InputFindLandlordPropertiesSerializer): Promise<OutputFindLandlordPropertiesSerializer> {
		return await this.findLandlordPropertiesUseCase.exec(input);
	}
}
