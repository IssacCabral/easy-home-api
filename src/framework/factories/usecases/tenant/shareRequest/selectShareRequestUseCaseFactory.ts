import { SelectShareRequestUseCase } from "@business/usecases/tenant/shareRequest/selectShareRequestUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { ShareRequestRepository } from "@framework/repositories/shareRequestRepository";

export const makeSelectShareRequestUseCase = (): SelectShareRequestUseCase => {
	const shareRequestRepository = new ShareRequestRepository(prismaClient);
	return new SelectShareRequestUseCase(shareRequestRepository);
};
