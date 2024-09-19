import type { IAddressEntity } from "@entities/components/address/address";
import type { IPropertyEntity, PropertyStatus, PropertyTypes } from "@entities/components/property/property";
import type { PaginationData, PaginationParams } from "@entities/shared/pagination";

export type InputCreateProperty = {
	id: string;
	landlordId: string;
	description: string;
	title: string;
	type: PropertyTypes;
	price: number;
	status: PropertyStatus;
	bedrooms: number;
	bathrooms: number;
	depth: number;
	width: number;
	photosUrl: string;
	amenityIds: string[];
	address: IAddressEntity;
};

export type InputFindManyProperties = PaginationParams;

export type OutputFindManyProperties = PaginationData<IPropertyEntity>;

export interface IPropertyRepository {
	create(input: InputCreateProperty): Promise<IPropertyEntity>;
	findAddressByCoordinates(lat: number, lon: number): Promise<IAddressEntity | null>;
	findMany(input: InputFindManyProperties): Promise<OutputFindManyProperties>;
}
