import type { CancelRentDivisionUseCase } from "@business/usecases/tenant/rentDivision/cancelRentDivisionUseCase";
import { AbstractOperator } from "@controllers/operators/abstractOperator";
import type {
	InputCancelRentDivisionSerializer,
	OutputCancelRentDivisionSerializer,
} from "@controllers/serializers/tenant/rentDivision/cancelRentDivisionSerializer";

export class CancelRentDivisionOperator extends AbstractOperator<
	InputCancelRentDivisionSerializer,
	OutputCancelRentDivisionSerializer
> {
	constructor(private readonly cancelRentDivisionUseCase: CancelRentDivisionUseCase) {
		super();
	}

	protected async run(input: InputCancelRentDivisionSerializer): Promise<OutputCancelRentDivisionSerializer> {
		return this.cancelRentDivisionUseCase.exec(input);
	}
}
