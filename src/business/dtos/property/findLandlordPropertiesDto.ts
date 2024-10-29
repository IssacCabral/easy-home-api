import type { IPropertyEntity, PropertyStatus } from "@entities/components/property/property";
import type { PaginationData, PaginationParams } from "@entities/shared/pagination";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputFindLandlordPropertiesDto = {
	landlordId: string;
	title?: string;
	tenantName?: string;
	status?: PropertyStatus;
} & PaginationParams;

export type OutputFindLandlordPropertiesDto = Either<IError, PaginationData<IPropertyEntity>>;
