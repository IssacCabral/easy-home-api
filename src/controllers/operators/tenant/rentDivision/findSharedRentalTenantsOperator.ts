import type { FindSharedRentalTenantsUseCase } from "@business/usecases/tenant/rentDivision/findSharedRentalTenantsUseCase";
import { AbstractOperator } from "@controllers/operators/abstractOperator";
import type {} from "@controllers/serializers/tenant/rentDivision/completeRentDivisionSerializer";
import type {
	InputFindSharedRentalTenantsSerializer,
	OutputFindSharedRentalTenantsSerializer,
} from "@controllers/serializers/tenant/rentDivision/findSharedRentalTenantsSerializer";
import type {} from "@controllers/serializers/tenant/rentDivision/openRentDivisionSerializer";

export class FindSharedRentalTenantsOperator extends AbstractOperator<
	InputFindSharedRentalTenantsSerializer,
	OutputFindSharedRentalTenantsSerializer
> {
	constructor(private readonly findSharedRentalTenantsUseCase: FindSharedRentalTenantsUseCase) {
		super();
	}

	protected async run(input: InputFindSharedRentalTenantsSerializer): Promise<OutputFindSharedRentalTenantsSerializer> {
		return this.findSharedRentalTenantsUseCase.exec(input);
	}
}
