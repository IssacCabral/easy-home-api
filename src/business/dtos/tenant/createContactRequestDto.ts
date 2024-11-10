import type { IContactRequestEntity } from "@entities/components/contactRequest/contactRequest";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputCreateContactRequestDto = {
	tenantId: string;
	propertyId: string;
};

export type OutputCreateContactRequestDto = Either<IError, IContactRequestEntity>;
