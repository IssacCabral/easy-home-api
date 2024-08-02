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
		return this.export().title;
	}

	get type(): PropertyTypes {
		return this.export().type;
	}

	get status(): PropertyStatus {
		return this.export().status;
	}

	get price(): number {
		return this.export().price;
	}

	get bedrooms(): number {
		return this.export().bedrooms;
	}

	get bathrooms(): number {
		return this.export().bathrooms;
	}

	get dimensions(): string {
		return this.export().dimensions;
	}

	get location(): string {
		return this.export().location;
	}

	get photosUrl(): string {
		return this.export().photosUrl;
	}
}
