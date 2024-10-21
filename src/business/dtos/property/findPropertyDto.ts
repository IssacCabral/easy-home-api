import type { IPropertyEntity } from "@entities/components/property/property";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputFindPropertyDto = {
	id: string;
};

export type OutputFindPropertyDto = Either<IError, IPropertyEntity>;
