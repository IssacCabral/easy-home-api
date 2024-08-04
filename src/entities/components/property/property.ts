import { AbstractEntity } from "@entities/shared/abstractEntity";
import type { IBaseModel } from "@entities/shared/baseModel";
import { type Either, right } from "@shared/either";
import type { IError } from "@shared/error";

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

export interface IPropertyEntity extends IBaseModel {
	landlordId: string;
	addressId: string;
	title: string;
	type: PropertyTypes;
	status: PropertyStatus;
	price: number;
	bedrooms: number; // todo: ou adiciona validação OU cria uma tipagem
	bathrooms: number; // todo: ou adiciona validação OU cria uma tipagem
	dimensions: string;
	location: string;
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

	get dimensions(): string {
		return this.props.dimensions;
	}

	get location(): string {
		return this.props.location;
	}

	get photosUrl(): string {
		return this.props.photosUrl;
	}
}
