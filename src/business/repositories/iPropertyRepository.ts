import type { IAddressEntity } from "@entities/components/address/address";
import type {
	BathroomsQuantity,
	BedroomsQuantity,
	IPropertyEntity,
	PropertyStatus,
	PropertyTypes,
} from "@entities/components/property/property";

export type InputCreateProperty = {
	id: string;
	landlordId: string;
	description: string;
	title: string;
	type: PropertyTypes;
	price: number;
	status: PropertyStatus;
	bedrooms: BedroomsQuantity;
	bathrooms: BathroomsQuantity;
	height: number;
	width: number;
	photosUrl: string;
	amenityIds: string[];
	address: IAddressEntity;
};

export interface IPropertyRepository {
	create(input: InputCreateProperty): Promise<IPropertyEntity>;
	findAddressByCoordinates(lat: number, lon: number): Promise<IAddressEntity | null>;
}
