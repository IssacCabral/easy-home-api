import type { IPropertyEntity } from "@entities/components/property/property";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputStopTenantRentDivisionDto = {
	propertyId: string;
	tenantId: string;
};

export type OutputStopTenantRentDivisionDto = Either<IError, IPropertyEntity>;
