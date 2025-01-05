import { FindShareRequestsUseCase } from "@business/usecases/tenant/shareRequest/findShareRequestsUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { PropertyRepository } from "@framework/repositories/propertyRepository";
import { ShareRequestRepository } from "@framework/repositories/shareRequestRepository";

export const makeFindShareRequestsUseCase = (): FindShareRequestsUseCase => {
	const shareRequestRepository = new ShareRequestRepository(prismaClient);
	const propertyRepository = new PropertyRepository(prismaClient);

	return new FindShareRequestsUseCase(shareRequestRepository, propertyRepository);
};
