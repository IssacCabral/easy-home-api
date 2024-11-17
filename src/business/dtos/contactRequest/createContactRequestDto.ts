import type { IContactRequestEntity } from "@entities/components/contactRequest/contactRequest";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputCreateContactRequestDto = {
	tenantId: string;
	propertyId: string;
};

type ContactRequestWithoutPasswordInTenant = Pick<
	IContactRequestEntity,
	"id" | "property" | "requestDate" | "status"
> & {
	tenant: Omit<IContactRequestEntity["tenant"], "password">;
};

export type OutputCreateContactRequestDto = Either<IError, ContactRequestWithoutPasswordInTenant>;
