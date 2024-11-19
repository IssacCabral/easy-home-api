import { OpenRentDivisionUseCase } from "@business/usecases/tenant/rentDivision/openRentDivisionUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { PropertyRepository } from "@framework/repositories/propertyRepository";

export const makeOpenRentDivisionUseCase = (): OpenRentDivisionUseCase => {
	const propertyRepository = new PropertyRepository(prismaClient);
	return new OpenRentDivisionUseCase(propertyRepository);
};
