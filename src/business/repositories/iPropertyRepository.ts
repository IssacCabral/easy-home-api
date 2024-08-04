import type {
	BathroomsQuantity,
	BedroomsQuantity,
	IPropertyEntity,
	PropertyTypes,
} from "@entities/components/property/property";

export type InputCreateProperty = {
	landlordId: string;
	addressId: string;
	title: string;
	type: PropertyTypes;
	price: number;
	bedrooms: BedroomsQuantity;
	bathrooms: BathroomsQuantity;
	height: number;
	width: number;
	photosUrl: string;
};

export interface IPropertyRepository {
	create(input: InputCreateProperty): Promise<IPropertyEntity>;
}
