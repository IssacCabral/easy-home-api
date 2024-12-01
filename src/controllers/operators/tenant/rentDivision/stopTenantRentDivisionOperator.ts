import type { StopTenantRentDivisionUseCase } from "@business/usecases/tenant/rentDivision/stopTenantRentDivisionUseCase";
import { AbstractOperator } from "@controllers/operators/abstractOperator";
import type {} from "@controllers/serializers/tenant/rentDivision/openRentDivisionSerializer";
import type {
	InputStopTenantRentDivisionSerializer,
	OutputStopTenantRentDivisionSerializer,
} from "@controllers/serializers/tenant/rentDivision/stopTenantRentDivisionSerializer";

export class StopTenantRentDivisionOperator extends AbstractOperator<
	InputStopTenantRentDivisionSerializer,
	OutputStopTenantRentDivisionSerializer
> {
	constructor(private readonly stopTenantRentDivisionUseCase: StopTenantRentDivisionUseCase) {
		super();
	}

	protected async run(input: InputStopTenantRentDivisionSerializer): Promise<OutputStopTenantRentDivisionSerializer> {
		return this.stopTenantRentDivisionUseCase.exec(input);
	}
}
