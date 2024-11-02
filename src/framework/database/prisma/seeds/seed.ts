import type { IAddressEntity } from "@entities/components/address/address";
import { generateRandomCoordinates } from "./generateRandomCoordinates";
import data from "./data.json";
import { randomUUID } from "node:crypto";
import { PropertyStatus, type IPropertyEntity } from "@entities/components/property/property";
import {
	generateRandomBathrooms,
	generateRandomBedrooms,
	generateRandomDescription,
	generateRandomDimensions,
	generateRandomPrice,
	generateRandomPropertyType,
	generateRandomTitle,
} from "./utils";

export interface StreetGeoJsonList {
	street: string;
	geojson: {
		type: string;
		coordinates: number[][];
	}[];
}

interface RandomCoordinate {
	randomLat: number;
	randomLon: number;
}

export const amenities = ["Ar-condicionado", "Garagem", "Wifi", "TV"];

function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateRandomCoordinatesALot(streetGeoJsonList: StreetGeoJsonList): RandomCoordinate[] {
	const randomCoordinates = [];

	for (let i = 0; i < 10; i++) {
		const coordinates = generateRandomCoordinates(streetGeoJsonList);
		if (coordinates) {
			randomCoordinates.push(coordinates);
		}
	}

	return randomCoordinates;
}

function createRandomAddresses(randomCoordinates: RandomCoordinate[], street: string) {
	const randomAddresses: IAddressEntity[] = [];
	let addressNumberCount = 1;

	for (const randomCoordinate of randomCoordinates) {
		const address: IAddressEntity = {
			id: randomUUID(),
			street,
			addressNumber: addressNumberCount++,
			lat: randomCoordinate.randomLat,
			lon: randomCoordinate.randomLon,
		};

		randomAddresses.push(address);
	}

	return randomAddresses;
}

function createdRandomProperties(addresses: IAddressEntity[]) {
	const randomProperties: IPropertyEntity[] = [];

	for (const address of addresses) {
		const property: IPropertyEntity = {
			id: randomUUID(),
			landlordId: "8464b3f6-5551-4633-ba4e-9d26389b69c9",
			title: generateRandomTitle(),
			type: generateRandomPropertyType(),
			description: generateRandomDescription(),
			price: generateRandomPrice(),
			bedrooms: generateRandomBedrooms(),
			bathrooms: generateRandomBathrooms(),
			width: generateRandomDimensions().width,
			depth: generateRandomDimensions().depth,
			address,
			status: PropertyStatus.FREE,
			photosUrl: "",
			amenities: [],
		};

		randomProperties.push(property);
	}

	return randomProperties;
}

for (const streetGeoJsonList of data.streetGeoJsonList) {
	const streetRandomCoordinates = generateRandomCoordinatesALot(streetGeoJsonList);
	const addresses = createRandomAddresses(streetRandomCoordinates, streetGeoJsonList.street);
	const properties = createdRandomProperties(addresses);

	console.log(`propriedades geradas para a rua: ${streetGeoJsonList.street}`);
	console.log(JSON.stringify(properties, null, 2));
}

// const addresses: IAddressEntity[] = [{}];

// const properties: IPropertyEntity[] = [{}];
