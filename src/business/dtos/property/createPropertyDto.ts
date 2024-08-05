import type { IAddressEntity } from "@entities/components/address/address";
import type {
	BathroomsQuantity,
	BedroomsQuantity,
	IPropertyEntity,
	PropertyTypes,
} from "@entities/components/property/property";
import type { Either } from "@shared/either";
import type { IError } from "@shared/error";

export type InputCreatePropertyDto = {
	landlordId: string;
	title: string;
	type: PropertyTypes;
	description: string;
	price: number;
	bedrooms: BedroomsQuantity;
	bathrooms: BathroomsQuantity;
	height: number;
	width: number;
	photosUrl: string;
	address: Omit<IAddressEntity, "id">;
	amenityIds: string[];
};

export type OutputCreatePropertyDtyo = Either<IError, IPropertyEntity>;
