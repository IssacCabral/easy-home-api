import { GetDashboardSummaryOperator } from "@controllers/operators/landlord/getDashboardSummaryOperator";
import { makeGetDashboardSummaryUseCase } from "@framework/factories/usecases/landlord/getDashboardSummaryUseCaseFactory";

export const makeGetDashboardSummaryOperator = (): GetDashboardSummaryOperator => {
	return new GetDashboardSummaryOperator(makeGetDashboardSummaryUseCase());
};
