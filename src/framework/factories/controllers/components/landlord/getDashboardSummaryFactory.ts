import { GetDashboardSummaryController } from "@controllers/components/landlord/getDashboardSummaryController";
import { makeGetDashboardSummaryOperator } from "../../operators/landlord/getDashboardSummaryOperatorFactory";

export const makeGetDashboardSummaryController = (): GetDashboardSummaryController => {
	return new GetDashboardSummaryController(makeGetDashboardSummaryOperator());
};
