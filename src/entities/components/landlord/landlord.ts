import { AbstractEntity } from "@entities/shared/abstractEntity";
import type { IBaseModel } from "@entities/shared/baseModel";
import { type Either, right } from "@shared/either";
import type { IError } from "@shared/error";

export interface ILandlordEntity extends IBaseModel {
	name: string;
	number: string;
	email: string;
	password: string;
	profilePicUrl?: string;
}

export class LandlordEntity extends AbstractEntity<ILandlordEntity> {
	static create(props: ILandlordEntity): Either<IError, LandlordEntity> {
		const landlord = new LandlordEntity(props);

		return right(landlord);
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

	get profilePicUrl(): string | undefined {
		return this.props.profilePicUrl;
	}
}
