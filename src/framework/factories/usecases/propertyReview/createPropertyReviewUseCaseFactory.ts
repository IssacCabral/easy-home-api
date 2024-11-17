import { CreatePropertyReviewUseCase } from "@business/usecases/propertyReview/createPropertyReviewUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { PropertyRepository } from "@framework/repositories/propertyRepository";
import { PropertyReviewRepository } from "@framework/repositories/propertyReviewRepository";
import { TenantRepository } from "@framework/repositories/tenantRepository";
import { UniqueIdentifierService } from "@framework/services/uniqueIdentifierService";

export const makeCreatePropertyReviewUseCase = (): CreatePropertyReviewUseCase => {
	const propertyReviewRepository = new PropertyReviewRepository(prismaClient);
	const propertyRepository = new PropertyRepository(prismaClient);
	const tenantRepository = new TenantRepository(prismaClient);
	const uniqueIdentifierService = new UniqueIdentifierService();

	return new CreatePropertyReviewUseCase(
		propertyReviewRepository,
		propertyRepository,
		tenantRepository,
		uniqueIdentifierService,
	);
};
