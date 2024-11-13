import { CloseContactRequestUseCase } from "@business/usecases/contactRequest/closeContactRequestUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { ContactRequestRepository } from "@framework/repositories/contactRequestRepository";

export const makeCloseContactRequestUseCase = (): CloseContactRequestUseCase => {
	const contactRequestRepository = new ContactRequestRepository(prismaClient);
	return new CloseContactRequestUseCase(contactRequestRepository);
};
