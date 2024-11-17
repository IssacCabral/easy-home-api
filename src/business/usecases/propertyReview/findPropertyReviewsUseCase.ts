import type {
	InputFindPropertyReviewsDto,
	OutputFindPropertyReviewsDto,
} from "@business/dtos/propertyReview/findPropertyReviewsDto";
import { PropertyNotFound } from "@business/errors/property";
import { FindPropertyReviewsGeneralError } from "@business/errors/propertyReview";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IPropertyReviewRepository } from "@business/repositories/iPropertyReviewRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { left, right } from "@shared/either";

export class FindPropertyReviewsUseCase implements IUseCase<InputFindPropertyReviewsDto, OutputFindPropertyReviewsDto> {
	constructor(
		private readonly propertyReviewRepository: IPropertyReviewRepository,
		private readonly propertyRepository: IPropertyRepository,
	) {}

	async exec(input: InputFindPropertyReviewsDto): Promise<OutputFindPropertyReviewsDto> {
		try {
			const property = await this.propertyRepository.findById(input.propertyId);
			if (!property) {
				return left(PropertyNotFound);
			}

			const propertyReviews = await this.propertyReviewRepository.findMany(input.propertyId);

			return right(propertyReviews);
		} catch (err) {
			return left(FindPropertyReviewsGeneralError);
		}
	}
}
