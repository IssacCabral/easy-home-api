import { FindPropertyReviewsUseCase } from "@business/usecases/propertyReview/findPropertyReviewsUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { PropertyRepository } from "@framework/repositories/propertyRepository";
import { PropertyReviewRepository } from "@framework/repositories/propertyReviewRepository";

export const makeFindPropertyReviewsUseCase = (): FindPropertyReviewsUseCase => {
	const propertyReviewRepository = new PropertyReviewRepository(prismaClient);
	const propertyRepository = new PropertyRepository(prismaClient);

	return new FindPropertyReviewsUseCase(propertyReviewRepository, propertyRepository);
};
