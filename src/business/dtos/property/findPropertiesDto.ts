import type { IPropertyEntity, PropertyStatus, PropertyTypes } from "@entities/components/property/property";
import type { PaginationData, PaginationParams } from "@entities/shared/pagination";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputFindPropertiesDto = {
	centralLat: number;
	centralLon: number;
	radiusInMeters: number;
	minPrice?: number;
	maxPrice?: number;
	minBedrooms?: number;
	maxBedrooms?: number;
	status?: PropertyStatus;
	type?: PropertyTypes;
	amenities?: string[];
} & PaginationParams;

export type OutputFindPropertiesDto = Either<IError, PaginationData<IPropertyEntity>>;
