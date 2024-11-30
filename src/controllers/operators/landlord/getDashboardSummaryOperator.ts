import type {
	InputGetDashboardSummarySerializer,
	OutputGetDashboardSummarySerializer,
} from "@controllers/serializers/landlord/getDashboardSummarySerializer";
import { AbstractOperator } from "../abstractOperator";
import type { GetDashboardSummaryUseCase } from "@business/usecases/landlord/getDashboardSummaryUseCase";

export class GetDashboardSummaryOperator extends AbstractOperator<
	InputGetDashboardSummarySerializer,
	OutputGetDashboardSummarySerializer
> {
	constructor(private readonly getDashboardSummaryUseCase: GetDashboardSummaryUseCase) {
		super();
	}

	protected async run(input: InputGetDashboardSummarySerializer): Promise<OutputGetDashboardSummarySerializer> {
		return await this.getDashboardSummaryUseCase.exec(input);
	}
}