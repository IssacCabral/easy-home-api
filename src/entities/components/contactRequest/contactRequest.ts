import { AbstractEntity } from "@entities/shared/abstractEntity";
import { type Either, right } from "@shared/either";
import type { IError } from "@shared/iError";
import type { IPropertyEntity } from "../property/property";
import type { ITenantEntity } from "../tenant/tenant";
import type { IAddressEntity } from "../address/address";
import type { IAmenityEntity } from "../amenity/amenity";

export enum ContactRequestStatus {
	IN_CONTACT = "IN_CONTACT",
	RENTED = "RENTED",
	FINISHED = "FINISHED",
}

type Property = Omit<IPropertyEntity, "address" | "amenities"> & {
	address?: IAddressEntity;
	amenities?: IAmenityEntity[];
};

export interface IContactRequestEntity {
	tenant: ITenantEntity;
	property: Property;
	status: ContactRequestStatus;
	requestDate: Date;
}

export class ContactRequestEntity extends AbstractEntity<IContactRequestEntity> {
	static create(props: IContactRequestEntity): Either<IError, ContactRequestEntity> {
		const contactRequest = new ContactRequestEntity(props);
		return right(contactRequest);
	}

	get tenant(): ITenantEntity {
		return this.props.tenant;
	}

	get property(): Property {
		return this.props.property;
	}

	get status(): ContactRequestStatus {
		return this.props.status;
	}

	get requestDate(): Date {
		return this.props.requestDate;
	}
}
