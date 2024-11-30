import { FindSharedRentalTenantsUseCase } from "@business/usecases/tenant/rentDivision/findSharedRentalTenantsUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { PropertyRepository } from "@framework/repositories/propertyRepository";

export const makeFindSharedRentalTenantsUseCase = (): FindSharedRentalTenantsUseCase => {
	const propertyRepository = new PropertyRepository(prismaClient);
	return new FindSharedRentalTenantsUseCase(propertyRepository);
};
