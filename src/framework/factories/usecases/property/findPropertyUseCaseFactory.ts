import { FindPropertyUseCase } from "@business/usecases/property/findPropertyUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { PropertyRepository } from "@framework/repositories/propertyRepository";

export const makeFindPropertyUseCase = (): FindPropertyUseCase => {
	const propertyRepository = new PropertyRepository(prismaClient);

	return new FindPropertyUseCase(propertyRepository);
};
