import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputCancelRentDivisionDto = {
	propertyId: string;
};

export type OutputCancelRentDivisionDto = Either<IError, null>;
