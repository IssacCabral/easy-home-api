import type { IAddressEntity } from "@entities/components/address/address";
import type { IPropertyEntity, PropertyTypes } from "@entities/components/property/property";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputCreatePropertyDto = {
	landlordId: string;
	title: string;
	type: PropertyTypes;
	description: string;
	price: number;
	bedrooms: number;
	bathrooms: number;
	depth: number;
	width: number;
	address: Omit<IAddressEntity, "id">;
	amenityIds: string[];
};

export type OutputCreatePropertyDto = Either<IError, IPropertyEntity>;
