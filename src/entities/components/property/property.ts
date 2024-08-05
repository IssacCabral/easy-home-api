import { AbstractEntity } from "@entities/shared/abstractEntity";
import type { IBaseModel } from "@entities/shared/baseModel";
import { type Either, right } from "@shared/either";
import type { IError } from "@shared/error";
import type { IAddressEntity } from "../address/address";

export enum PropertyTypes {
	HOUSE = "HOUSE",
	DUPLEX = "DUPLEX",
	APARTMENT = "APARTMENT",
}

export enum PropertyStatus {
	FREE = "FREE",
	BUSY = "BUSY",
	SPLIT = "SPLIT",
}

export type BedroomsQuantity = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type BathroomsQuantity = 1 | 2 | 3 | 4 | 5;

export interface IPropertyEntity extends IBaseModel {
	landlordId: string;
	title: string;
	type: PropertyTypes;
	status: PropertyStatus;
	address: IAddressEntity;
	price: number;
	bedrooms: BedroomsQuantity;
	bathrooms: BathroomsQuantity;
	description: string;
	height: number;
	width: number;
	photosUrl: string;
}

export class PropertyEntity extends AbstractEntity<IPropertyEntity> {
	static create(props: IPropertyEntity): Either<IError, PropertyEntity> {
		const property = new PropertyEntity(props);

		return right(property);
	}

	get title(): string {
		return this.props.title;
	}

	get type(): PropertyTypes {
		return this.props.type;
	}

	get status(): PropertyStatus {
		return this.props.status;
	}

	get price(): number {
		return this.props.price;
	}

	get bedrooms(): number {
		return this.props.bedrooms;
	}

	get bathrooms(): number {
		return this.props.bathrooms;
	}

	get height(): number {
		return this.props.height;
	}

	get width(): number {
		return this.props.width;
	}

	get photosUrl(): string {
		return this.props.photosUrl;
	}

	get address(): IAddressEntity {
		return this.props.address;
	}

	get description(): string {
		return this.props.description;
	}
}
