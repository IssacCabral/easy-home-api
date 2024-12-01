import { StopTenantRentDivisionUseCase } from "@business/usecases/tenant/rentDivision/stopTenantRentDivisionUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { PropertyRepository } from "@framework/repositories/propertyRepository";

export const makeStopTenantRentDivisionUseCase = (): StopTenantRentDivisionUseCase => {
	const propertyRepository = new PropertyRepository(prismaClient);
	return new StopTenantRentDivisionUseCase(propertyRepository);
};
