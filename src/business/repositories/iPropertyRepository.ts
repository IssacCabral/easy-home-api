import type {
	BathroomsQuantity,
	BedroomsQuantity,
	IPropertyEntity,
	PropertyStatus,
	PropertyTypes,
} from "@entities/components/property/property";

export type InputCreateProperty = {
	landlordId: string;
	addressId: string;
	title: string;
	type: PropertyTypes;
	price: number;
	status: PropertyStatus;
	bedrooms: BedroomsQuantity;
	bathrooms: BathroomsQuantity;
	height: number;
	width: number;
	photosUrl: string;
};

export interface IPropertyRepository {
	create(input: InputCreateProperty): Promise<IPropertyEntity>;
}
