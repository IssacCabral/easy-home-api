import { CreatePropertyUseCase } from "@business/usecases/property/createPropertyUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { AmenityRepository } from "@framework/repositories/amenityRepository";
import { LandlordRepository } from "@framework/repositories/landlordRepository";
import { PropertyRepository } from "@framework/repositories/propertyRepository";
import { UniqueIdentifierService } from "@framework/services/uniqueIdentifierService";

export const makeCreatePropertyUseCase = (): CreatePropertyUseCase => {
	const landlordRepository = new LandlordRepository(prismaClient);
	const propertyRepository = new PropertyRepository(prismaClient);
	const amenityRepository = new AmenityRepository(prismaClient);
	const uniqueIdentifierService = new UniqueIdentifierService();

	return new CreatePropertyUseCase(landlordRepository, propertyRepository, amenityRepository, uniqueIdentifierService);
};
