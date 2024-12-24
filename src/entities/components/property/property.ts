import {
	InvalidBathroomsQuantity,
	InvalidBedroomsQuantity,
	InvalidDepth,
	InvalidWidth,
} from "@entities/errors/property";
import { AbstractEntity } from "@entities/shared/abstractEntity";
import type { IBaseModel } from "@entities/shared/baseModel";
import { type Either, left, right } from "@shared/either";
import type { IError } from "@shared/iError";
import type { IAddressEntity } from "../address/address";
import type { IAmenityEntity } from "../amenity/amenity";
import type { ILandlordEntity } from "../landlord/landlord";
import type { ITenantEntity } from "../tenant/tenant";

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
	address: IAddressEntity;
	price: number;
	bedrooms: number;
	bathrooms: number;
	description: string;
	width: number;
	depth: number;
	photosUrl: string;
	amenities: IAmenityEntity[];
	tenants?: Omit<ITenantEntity, "password">[];
	landlord?: ILandlordEntity;
}

export class PropertyEntity extends AbstractEntity<IPropertyEntity> {
	private static readonly MAX_BATHROOMS_QUANTITY = 10;
	private static readonly MAX_BEDROOMS_QUANTITY = 10;
	private static readonly MAX_WIDTH = 50;
	private static readonly MAX_DEPTH = 100;

	static create(props: IPropertyEntity): Either<IError, PropertyEntity> {
		const validateResult = PropertyEntity.validateFields({
			bathrooms: props.bathrooms,
			bedrooms: props.bedrooms,
			depth: props.depth,
			width: props.width,
		});

		if (validateResult.isLeft()) {
			return left(validateResult.value);
		}

		const property = new PropertyEntity(props);

		return right(property);
	}

	private static validateFields(fields: {
		bathrooms: number;
		bedrooms: number;
		width: number;
		depth: number;
	}): Either<IError, boolean> {
		if (fields.bathrooms <= 0 || fields.bathrooms > PropertyEntity.MAX_BATHROOMS_QUANTITY) {
			return left(InvalidBathroomsQuantity);
		}

		if (fields.bedrooms <= 0 || fields.bedrooms > PropertyEntity.MAX_BEDROOMS_QUANTITY) {
			return left(InvalidBedroomsQuantity);
		}

		if (fields.width <= 0 || fields.width > PropertyEntity.MAX_WIDTH) {
			return left(InvalidWidth);
		}

		if (fields.depth <= 0 || fields.depth > PropertyEntity.MAX_DEPTH) {
			return left(InvalidDepth);
		}

		return right(true);
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

	get depth(): number {
		return this.props.depth;
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
