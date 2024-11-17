import type { IPropertyReviewEntity, Rating } from "@entities/components/propertyReview/propertyReview";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputCreatePropertyReviewDto = {
	propertyId: string;
	tenantId: string;
	rating: Rating;
	comment: string;
};

export type OutputCreatePropertyReviewDto = Either<IError, IPropertyReviewEntity>;
