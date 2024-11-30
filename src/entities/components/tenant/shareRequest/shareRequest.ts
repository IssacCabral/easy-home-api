import type { IAddressEntity } from "@entities/components/address/address";
import type { IAmenityEntity } from "@entities/components/amenity/amenity";
import type { IPropertyEntity } from "@entities/components/property/property";
import type { ITenantEntity } from "../tenant";

export enum ShareRequestStatus {
	IN_CONTACT = "IN_CONTACT",
	SELECTED = "SELECTED",
	FINISHED = "FINISHED",
}

type Property = Omit<IPropertyEntity, "address" | "amenities"> & {
	address?: IAddressEntity;
	amenities?: IAmenityEntity[];
};

export interface IShareRequestEntity {
	id: string;
	tenant: ITenantEntity;
	property: Property;
	status: ShareRequestStatus;
	finalizationReason?: string;
	requestDate: Date;
}
