import type { ContactRequestStatus, IContactRequestEntity } from "@entities/components/contactRequest/contactRequest";
import type { PaginationData, PaginationParams } from "@entities/shared/pagination";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputFindLandlordContactRequestsDto = {
	landlordId: string;
	title?: string;
	tenantName?: string;
	status?: ContactRequestStatus;
} & PaginationParams;

export type ContactRequestWithoutPasswordInTenant = Pick<
	IContactRequestEntity,
	"property" | "requestDate" | "status"
> & {
	tenant: Omit<IContactRequestEntity["tenant"], "password">;
};

export type OutputFindLandlordContactRequestsDto = Either<
	IError,
	PaginationData<ContactRequestWithoutPasswordInTenant>
>;
