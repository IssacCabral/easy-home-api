import { AbstractEntity } from "@entities/shared/abstractEntity";
import type { IBaseModel } from "@entities/shared/baseModel";
import { type Either, right } from "@shared/either";
import type { IError } from "@shared/error";

export interface ITenantEntity extends IBaseModel {
	name: string;
	number: string;
	email: string;
	password: string;
	profilePicUrl: string;
}

export class TenantEntity extends AbstractEntity<ITenantEntity> {
	static create(props: ITenantEntity): Either<IError, TenantEntity> {
		const tenant = new TenantEntity(props);

		return right(tenant);
	}

	get name(): string {
		return this.props.name;
	}

	get number(): string {
		return this.props.number;
	}

	get email(): string {
		return this.props.email;
	}

	get profilePicUrl(): string {
		return this.props.profilePicUrl;
	}
}
