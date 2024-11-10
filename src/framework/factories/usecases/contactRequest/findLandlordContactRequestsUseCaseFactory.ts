import { FindLandlordContactRequestsUseCase } from "@business/usecases/contactRequest/findLandlordContactRequestsUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { ContactRequestRepository } from "@framework/repositories/contactRequestRepository";
import { LandlordRepository } from "@framework/repositories/landlordRepository";

export const makeFindLandlordContactRequestsUseCase = (): FindLandlordContactRequestsUseCase => {
	const contactRequestRepository = new ContactRequestRepository(prismaClient);
	const landlordRepository = new LandlordRepository(prismaClient);

	return new FindLandlordContactRequestsUseCase(contactRequestRepository, landlordRepository);
};
