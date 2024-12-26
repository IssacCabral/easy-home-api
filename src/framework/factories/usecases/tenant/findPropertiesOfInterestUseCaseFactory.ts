import { FindPropertiesOfInterestUseCase } from "@business/usecases/tenant/findPropertiesOfInterestUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { ContactRequestRepository } from "@framework/repositories/contactRequestRepository";
import { ShareRequestRepository } from "@framework/repositories/shareRequestRepository";

export const makeFindPropertiesOfInterestUseCase = (): FindPropertiesOfInterestUseCase => {
	const contactRequestRepository = new ContactRequestRepository(prismaClient);
	const shareRequestRepository = new ShareRequestRepository(prismaClient);

	return new FindPropertiesOfInterestUseCase(contactRequestRepository, shareRequestRepository);
};
