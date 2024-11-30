import type { IShareRequestEntity, ShareRequestStatus } from "@entities/components/tenant/shareRequest/shareRequest";

export type InputCreateShareRequest = {
	id: string;
	tenantId: string;
	propertyId: string;
	status: ShareRequestStatus;
};

export type IShareRequestRepository = {
	create(input: InputCreateShareRequest): Promise<IShareRequestEntity>;
	findInContact(tenantId: string, propertyId: string): Promise<IShareRequestEntity | null>;
};
