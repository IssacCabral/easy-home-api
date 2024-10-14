import { AbstractEntity } from "@entities/shared/abstractEntity";
import type { IBaseModel } from "@entities/shared/baseModel";
import { type Either, right } from "@shared/either";
import type { IError } from "@shared/iError";

export interface ITenantEntity extends IBaseModel {
	name: string;
	phone: string;
	email: string;
	password: string;
	profilePicUrl?: string;
}

export class TenantEntity extends AbstractEntity<ITenantEntity> {
	static create(props: ITenantEntity): Either<IError, TenantEntity> {
		const tenant = new TenantEntity(props);

		return right(tenant);
	}

	get id(): string {
		return this.props.id;
	}

	get name(): string {
		return this.props.name;
	}

	get phone(): string {
		return this.props.phone;
	}

	get email(): string {
		return this.props.email;
	}

	get profilePicUrl(): string | undefined {
		return this.props.profilePicUrl;
	}
}
