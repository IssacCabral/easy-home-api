import type { ContactRequestStatus, IContactRequestEntity } from "@entities/components/contactRequest/contactRequest";
import type { PaginationData, PaginationParams } from "@entities/shared/pagination";

export type InputCreateContactRequest = {
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

export interface IContactRequestRepository {
	create(input: InputCreateContactRequest): Promise<IContactRequestEntity>;
	findUnique(tenantId: string, propertyId: string): Promise<IContactRequestEntity | null>;
	findLandlordContactRequests(input: InputFindLandlordContactRequests): Promise<OutputFindLandlordContactRequests>;
	rentProperty(tenantId: string, propertyId: string): Promise<IContactRequestEntity>;
	finalizePendingContactRequests(tenantId: string, propertyId: string): Promise<void>;
}
