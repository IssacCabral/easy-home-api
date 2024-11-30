import { CreateShareRequestUseCase } from "@business/usecases/tenant/shareRequest/createShareRequestUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { PropertyRepository } from "@framework/repositories/propertyRepository";
import { ShareRequestRepository } from "@framework/repositories/shareRequestRepository";
import { TenantRepository } from "@framework/repositories/tenantRepository";
import { UniqueIdentifierService } from "@framework/services/uniqueIdentifierService";

export const makeCreateShareRequestUseCase = (): CreateShareRequestUseCase => {
	const shareRequestRepository = new ShareRequestRepository(prismaClient);
	const propertyRepository = new PropertyRepository(prismaClient);
	const tenantRepository = new TenantRepository(prismaClient);
	const uniqueIdentifierService = new UniqueIdentifierService();

	return new CreateShareRequestUseCase(
		shareRequestRepository,
		propertyRepository,
		tenantRepository,
		uniqueIdentifierService,
	);
};
