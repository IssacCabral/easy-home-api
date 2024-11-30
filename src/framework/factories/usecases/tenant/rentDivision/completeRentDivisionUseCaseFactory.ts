import { CompleteRentDivisionUseCase } from "@business/usecases/tenant/rentDivision/completeRentDivisionUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { PropertyRepository } from "@framework/repositories/propertyRepository";
import { ShareRequestRepository } from "@framework/repositories/shareRequestRepository";

export const makeCompleteRentDivisionUseCase = (): CompleteRentDivisionUseCase => {
	const propertyRepository = new PropertyRepository(prismaClient);
	const shareRequestRepository = new ShareRequestRepository(prismaClient);

	return new CompleteRentDivisionUseCase(propertyRepository, shareRequestRepository);
};
