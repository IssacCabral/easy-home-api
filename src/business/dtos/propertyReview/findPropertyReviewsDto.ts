import type { IPropertyReviewEntity } from "@entities/components/propertyReview/propertyReview";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputFindPropertyReviewsDto = {
	propertyId: string;
};

export type OutputFindPropertyReviewsDto = Either<IError, IPropertyReviewEntity[]>;
