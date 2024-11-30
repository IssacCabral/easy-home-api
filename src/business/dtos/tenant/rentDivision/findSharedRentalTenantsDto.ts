import type { ITenantEntity } from "@entities/components/tenant/tenant";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputFindSharedRentalTenantsDto = {
	propertyId: string;
};

export type OutputFindSharedRentalTenantsDto = Either<IError, ITenantEntity[]>;
