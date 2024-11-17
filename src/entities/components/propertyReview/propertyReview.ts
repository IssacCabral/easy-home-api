import type { IBaseModel } from "@entities/shared/baseModel";
import type { IPropertyEntity } from "../property/property";
import { AbstractEntity } from "@entities/shared/abstractEntity";
import { type Either, right } from "@shared/either";
import type { IError } from "@shared/iError";
import type { ITenantEntity } from "../tenant/tenant";
import type { IAddressEntity } from "../address/address";
import type { IAmenityEntity } from "../amenity/amenity";

export type Rating = 1 | 2 | 3 | 4 | 5;

type Property = Omit<IPropertyEntity, "address" | "amenities"> & {
	address?: IAddressEntity;
	amenities?: IAmenityEntity[];
};

export interface IPropertyReviewEntity extends IBaseModel {
	property: Property;
	tenant: ITenantEntity;
	rating: Rating;
	comment: string;
}

export class PropertyReviewEntity extends AbstractEntity<IPropertyReviewEntity> {
	static create(props: IPropertyReviewEntity): Either<IError, PropertyReviewEntity> {
		const propertyReview = new PropertyReviewEntity(props);
		return right(propertyReview);
	}

	get property(): Property {
		return this.props.property;
	}

	get tenant(): ITenantEntity {
		return this.props.tenant;
	}

	get rating(): Rating {
		return this.props.rating;
	}

	get comment(): string {
		return this.props.comment;
	}
}
