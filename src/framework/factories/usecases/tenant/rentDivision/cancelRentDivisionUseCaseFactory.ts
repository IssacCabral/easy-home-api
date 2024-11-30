import { CancelRentDivisionUseCase } from "@business/usecases/tenant/rentDivision/cancelRentDivisionUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { PropertyRepository } from "@framework/repositories/propertyRepository";
import { ShareRequestRepository } from "@framework/repositories/shareRequestRepository";

export const makeCancelRentDivisionUseCase = (): CancelRentDivisionUseCase => {
	const propertyRepository = new PropertyRepository(prismaClient);
	const shareRequestRepository = new ShareRequestRepository(prismaClient);

	return new CancelRentDivisionUseCase(propertyRepository, shareRequestRepository);
};
