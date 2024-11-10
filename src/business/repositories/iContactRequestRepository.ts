import type { ContactRequestStatus, IContactRequestEntity } from "@entities/components/contactRequest/contactRequest";

export type InputCreateContactRequest = {
	tenantId: string;
	propertyId: string;
	status: ContactRequestStatus;
};

export interface IContactRequestRepository {
	create(input: InputCreateContactRequest): Promise<IContactRequestEntity>;
	findUnique(tenantId: string, propertyId: string): Promise<IContactRequestEntity | null>;
}
