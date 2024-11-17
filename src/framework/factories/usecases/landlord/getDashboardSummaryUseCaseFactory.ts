import { GetDashboardSummaryUseCase } from "@business/usecases/landlord/getDashboardSummaryUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { LandlordRepository } from "@framework/repositories/landlordRepository";

export const makeGetDashboardSummaryUseCase = (): GetDashboardSummaryUseCase => {
	const landlordRepository = new LandlordRepository(prismaClient);

	return new GetDashboardSummaryUseCase(landlordRepository);
};
