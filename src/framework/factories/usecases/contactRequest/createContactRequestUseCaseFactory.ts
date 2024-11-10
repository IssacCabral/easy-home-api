import { CreateContactRequestUseCase } from "@business/usecases/contactRequest/createContactRequestUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { ContactRequestRepository } from "@framework/repositories/contactRequestRepository";

export const makeCreateContactRequestUseCase = (): CreateContactRequestUseCase => {
	const contactRequestRepository = new ContactRequestRepository(prismaClient);

	return new CreateContactRequestUseCase(contactRequestRepository);
};
