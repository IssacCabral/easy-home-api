import { RentPropertyUseCase } from "@business/usecases/contactRequest/rentPropertyUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { ContactRequestRepository } from "@framework/repositories/contactRequestRepository";
import { PropertyRepository } from "@framework/repositories/propertyRepository";
import { ShareRequestRepository } from "@framework/repositories/shareRequestRepository";

export const makeRentPropertyUseCase = (): RentPropertyUseCase => {
	const contactRequestRepository = new ContactRequestRepository(prismaClient);
	const propertyRepository = new PropertyRepository(prismaClient);
	const shareRequestRepository = new ShareRequestRepository(prismaClient);

	return new RentPropertyUseCase(contactRequestRepository, propertyRepository, shareRequestRepository);
};
