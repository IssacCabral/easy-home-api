import type { CompleteRentDivisionUseCase } from "@business/usecases/tenant/rentDivision/completeRentDivisionUseCase";
import { AbstractOperator } from "@controllers/operators/abstractOperator";
import type {
	InputCompleteRentDivisionSerializer,
	OutputCompleteRentDivisionSerializer,
} from "@controllers/serializers/tenant/rentDivision/completeRentDivisionSerializer";
import type {} from "@controllers/serializers/tenant/rentDivision/openRentDivisionSerializer";

export class CompleteRentDivisionOperator extends AbstractOperator<
	InputCompleteRentDivisionSerializer,
	OutputCompleteRentDivisionSerializer
> {
	constructor(private readonly completeRentDivisionUseCase: CompleteRentDivisionUseCase) {
		super();
	}

	protected async run(input: InputCompleteRentDivisionSerializer): Promise<OutputCompleteRentDivisionSerializer> {
		return this.completeRentDivisionUseCase.exec(input);
	}
}
