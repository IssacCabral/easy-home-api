import type { ContactRequestStatus, IContactRequestEntity } from "@entities/components/contactRequest/contactRequest";
import type { PaginationData, PaginationParams } from "@entities/shared/pagination";

export type InputCreateContactRequest = {
	id: string;
	tenantId: string;
	propertyId: string;
	status: ContactRequestStatus;
};

export type InputFindLandlordContactRequests = {
	landlordId: string;
	title?: string;
	tenantName?: string;
	status?: ContactRequestStatus;
} & PaginationParams;

export type OutputFindLandlordContactRequests = PaginationData<IContactRequestEntity>;

export type InputCloseContactRequest = {
	id: string;
	reason?: string;
};

export interface IContactRequestRepository {
	create(input: InputCreateContactRequest): Promise<IContactRequestEntity>;
	findById(id: string): Promise<IContactRequestEntity | null>;
	findInContact(tenantId: string, propertyId: string): Promise<IContactRequestEntity | null>;
	findLandlordContactRequests(input: InputFindLandlordContactRequests): Promise<OutputFindLandlordContactRequests>;
	findTenantContactRequests(tenantId: string): Promise<IContactRequestEntity[]>;
	rentProperty(contactRequestId: string): Promise<IContactRequestEntity>;
	finalizePendingContactRequests(tenantId: string, propertyId: string): Promise<void>;
	close(input: InputCloseContactRequest): Promise<IContactRequestEntity>;
	closePendingsByTenantId(tenantId: string): Promise<void>;
}
