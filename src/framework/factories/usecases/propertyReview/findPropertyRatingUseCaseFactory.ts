import { FindPropertyRatingUseCase } from "@business/usecases/propertyReview/findPropertyRatingUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { PropertyRepository } from "@framework/repositories/propertyRepository";
import { PropertyReviewRepository } from "@framework/repositories/propertyReviewRepository";

export const makeFindPropertyRatingUseCase = (): FindPropertyRatingUseCase => {
	const propertyReviewRepository = new PropertyReviewRepository(prismaClient);
	const propertyRepository = new PropertyRepository(prismaClient);

	return new FindPropertyRatingUseCase(propertyReviewRepository, propertyRepository);
};
