import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputGetDashboardSummaryDto = {
	landlordId: string;
};

export type DashboardSummary = {
	monthlyIncome: number;
	busyProperties: number;
	contactRequests: number;
};

export type OutputGetDashboardSummaryDto = Either<IError, DashboardSummary>;
