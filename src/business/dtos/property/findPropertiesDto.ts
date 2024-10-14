import type { IPropertyEntity } from "@entities/components/property/property";
import type { PaginationData, PaginationParams } from "@entities/shared/pagination";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputFindPropertiesDto = {
	centralLat: number;
	centralLon: number;
	radiusInMeters: number;
} & PaginationParams;

export type OutputFindPropertiesDto = Either<IError, PaginationData<IPropertyEntity>>;