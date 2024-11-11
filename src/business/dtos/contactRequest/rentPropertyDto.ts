import type { IContactRequestEntity } from "@entities/components/contactRequest/contactRequest";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputRentPropertyDto = {
	propertyId: string;
	tenantId: string;
};

export type OutputRentPropertyDto = Either<IError, IContactRequestEntity>;
