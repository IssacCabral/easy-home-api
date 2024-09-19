import { PropertyStatus, PropertyTypes, type IPropertyEntity } from "@entities/components/property/property";
import { fakeAmenityEntity } from "./amenityEntity";
import { fakeAddressEntity } from "./addressEntity";

export const fakePropertyEntity: IPropertyEntity = {
	id: "a09a1648-63e7-4d99-92b6-820999fd7adb",
	address: fakeAddressEntity,
	amenities: [fakeAmenityEntity],
	bathrooms: 2,
	bedrooms: 2,
	description: "A beautiful house",
	depth: 20,
	landlordId: "00539f9e-a439-45c4-a967-2df677a17879",
	photosUrl: "www.bucket-amazon.com",
	price: 400,
	status: PropertyStatus.FREE,
	title: "Casa Rosada",
	type: PropertyTypes.HOUSE,
	width: 20,
};
