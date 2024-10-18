import { GetAllAmenitiesUseCase } from "@business/usecases/amenity/getAllAmenitiesUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { AmenityRepository } from "@framework/repositories/amenityRepository";

export const makeGetAllAmenitiesUseCase = (): GetAllAmenitiesUseCase => {
	const amenityRepository = new AmenityRepository(prismaClient);

	return new GetAllAmenitiesUseCase(amenityRepository);
};
