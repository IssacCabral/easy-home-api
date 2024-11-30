import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputCompleteRentDivisionDto = {
	propertyId: string;
};

export type OutputCompleteRentDivisionDto = Either<IError, null>;
