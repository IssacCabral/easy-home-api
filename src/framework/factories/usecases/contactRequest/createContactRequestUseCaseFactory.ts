import { CreateContactRequestUseCase } from "@business/usecases/contactRequest/createContactRequestUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { ContactRequestRepository } from "@framework/repositories/contactRequestRepository";
import { PropertyRepository } from "@framework/repositories/propertyRepository";

export const makeCreateContactRequestUseCase = (): CreateContactRequestUseCase => {
	const contactRequestRepository = new ContactRequestRepository(prismaClient);
	const propertyRepository = new PropertyRepository(prismaClient);

	return new CreateContactRequestUseCase(contactRequestRepository, propertyRepository);
};
