import type {
	InputFindPropertyRatingDto,
	OutputFindPropertyRatingDto,
} from "@business/dtos/propertyReview/findPropertyRatingDto";
import { PropertyNotFound } from "@business/errors/property";
import { FindPropertyRatingGeneralError } from "@business/errors/propertyReview";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IPropertyReviewRepository } from "@business/repositories/iPropertyReviewRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { left, right } from "@shared/either";

export class FindPropertyRatingUseCase implements IUseCase<InputFindPropertyRatingDto, OutputFindPropertyRatingDto> {
	constructor(
		private readonly propertyReviewRepository: IPropertyReviewRepository,
		private readonly propertyRepository: IPropertyRepository,
	) {}

	async exec(input: InputFindPropertyRatingDto): Promise<OutputFindPropertyRatingDto> {
		try {
			const property = await this.propertyRepository.findById(input.propertyId);
			if (!property) {
				return left(PropertyNotFound);
			}

			const propertyRating = await this.propertyReviewRepository.findRating(input.propertyId);

			return right({ rating: propertyRating });
		} catch (err) {
			return left(FindPropertyRatingGeneralError);
		}
	}
}
