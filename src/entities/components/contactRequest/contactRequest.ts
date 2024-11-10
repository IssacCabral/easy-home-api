import { AbstractEntity } from "@entities/shared/abstractEntity";
import { type Either, right } from "@shared/either";
import type { IError } from "@shared/iError";
import type { IPropertyEntity } from "../property/property";
import type { ITenantEntity } from "../tenant/tenant";

export enum ContactRequestStatus {
	IN_CONTACT = "IN_CONTACT",
	RENTED = "RENTED",
	FINISHED = "FINISHED",
}

export interface IContactRequestEntity {
	tenant: ITenantEntity;
	property: IPropertyEntity;
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

	get property(): IPropertyEntity {
		return this.props.property;
	}

	get status(): ContactRequestStatus {
		return this.props.status;
	}

	get requestDate(): Date {
		return this.props.requestDate;
	}
}
