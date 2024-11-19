import type { IPropertyEntity } from "@entities/components/property/property";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputOpenRentDivisionDto = {
	propertyId: string;
};

export type OutputOpenRentDivisionDto = Either<IError, IPropertyEntity>;
