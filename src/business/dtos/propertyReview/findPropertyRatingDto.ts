import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputFindPropertyRatingDto = {
	propertyId: string;
};

export type OutputFindPropertyRatingDto = Either<IError, { rating: number }>;
