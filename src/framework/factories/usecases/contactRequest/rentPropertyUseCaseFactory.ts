import { RentPropertyUseCase } from "@business/usecases/contactRequest/rentPropertyUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { ContactRequestRepository } from "@framework/repositories/contactRequestRepository";
import { PropertyRepository } from "@framework/repositories/propertyRepository";

export const makeRentPropertyUseCase = (): RentPropertyUseCase => {
	const contactRequestRepository = new ContactRequestRepository(prismaClient);
	const propertyRepository = new PropertyRepository(prismaClient);

	return new RentPropertyUseCase(contactRequestRepository, propertyRepository);
};
