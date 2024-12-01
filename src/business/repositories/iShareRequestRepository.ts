import type { IShareRequestEntity, ShareRequestStatus } from "@entities/components/tenant/shareRequest/shareRequest";

export type InputCreateShareRequest = {
	id: string;
	tenantId: string;
	propertyId: string;
	status: ShareRequestStatus;
};

export type IShareRequestRepository = {
	create(input: InputCreateShareRequest): Promise<IShareRequestEntity>;
	findFirst(tenantId: string, propertyId: string): Promise<IShareRequestEntity | null>;
	findById(id: string): Promise<IShareRequestEntity | null>;
	select(shareRequestId: string): Promise<IShareRequestEntity>;
	finish(shareRequestId: string): Promise<IShareRequestEntity>;
	cancelAll(propertyId: string): Promise<void>;
	cancelTenantOnShareRequests(tenantId: string): Promise<void>;
	findByStatus(propertyId: string, status: ShareRequestStatus): Promise<IShareRequestEntity[]>;
};
