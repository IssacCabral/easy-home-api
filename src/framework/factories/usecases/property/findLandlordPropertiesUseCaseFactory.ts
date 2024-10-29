import { FindLandlordPropertiesUseCase } from "@business/usecases/property/findLandlordPropertiesUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { LandlordRepository } from "@framework/repositories/landlordRepository";
import { PropertyRepository } from "@framework/repositories/propertyRepository";

export const makeFindLandlordPropertiesUseCase = (): FindLandlordPropertiesUseCase => {
	const propertyRepository = new PropertyRepository(prismaClient);
	const landlordRepository = new LandlordRepository(prismaClient);

	return new FindLandlordPropertiesUseCase(propertyRepository, landlordRepository);
};
