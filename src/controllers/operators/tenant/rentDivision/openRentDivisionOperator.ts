import type { OpenRentDivisionUseCase } from "@business/usecases/tenant/rentDivision/openRentDivisionUseCase";
import { AbstractOperator } from "@controllers/operators/abstractOperator";
import type {
	InputOpenRentDivisionSerializer,
	OutputOpenRentDivisionSerializer,
} from "@controllers/serializers/tenant/rentDivision/openRentDivisionSerializer";

export class OpenRentDivisionOperator extends AbstractOperator<
	InputOpenRentDivisionSerializer,
	OutputOpenRentDivisionSerializer
> {
	constructor(private readonly openRentDivisionUseCase: OpenRentDivisionUseCase) {
		super();
	}

	protected async run(input: InputOpenRentDivisionSerializer): Promise<OutputOpenRentDivisionSerializer> {
		return this.openRentDivisionUseCase.exec(input);
	}
}
