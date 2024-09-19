import { FindPropertiesUseCase } from "@business/usecases/property/findPropertiesUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { PropertyRepository } from "@framework/repositories/propertyRepository";

export const makeFindPropertiesUseCase = (): FindPropertiesUseCase => {
	const propertyRepository = new PropertyRepository(prismaClient);

	return new FindPropertiesUseCase(propertyRepository);
};
