import { FinishShareRequestUseCase } from "@business/usecases/tenant/shareRequest/finishShareRequestUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { ShareRequestRepository } from "@framework/repositories/shareRequestRepository";

export const makeFinishShareRequestUseCase = (): FinishShareRequestUseCase => {
	const shareRequestRepository = new ShareRequestRepository(prismaClient);
	return new FinishShareRequestUseCase(shareRequestRepository);
};
