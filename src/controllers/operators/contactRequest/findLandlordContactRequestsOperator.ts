import type { FindLandlordContactRequestsUseCase } from "@business/usecases/contactRequest/findLandlordContactRequestsUseCase";
import type {
	InputFindLandlordContactRequestsSerializer,
	OutputFindLandlordContactRequestsSerializer,
} from "@controllers/serializers/contactRequest/findLandlordContactRequestsSerializer";
import { AbstractOperator } from "../abstractOperator";

export class FindLandlordContactRequestsOperator extends AbstractOperator<
	InputFindLandlordContactRequestsSerializer,
	OutputFindLandlordContactRequestsSerializer
> {
	constructor(private readonly findLandlordContactRequestsUseCase: FindLandlordContactRequestsUseCase) {
		super();
	}

	protected async run(
		input: InputFindLandlordContactRequestsSerializer,
	): Promise<OutputFindLandlordContactRequestsSerializer> {
		return await this.findLandlordContactRequestsUseCase.exec(input);
	}
}
