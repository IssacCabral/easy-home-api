import type { IAddressEntity } from "@entities/components/address/address";
import { generateRandomCoordinates } from "../generateRandomCoordinates";
import { streetGeoJsonList, properties } from "../data/data.json";
import { PropertyStatus } from "@entities/components/property/property";
import {
	generateRandomAmenities,
	generateRandomBathrooms,
	generateRandomBedrooms,
	generateRandomDimensions,
	generateRandomPrice,
	generateRandomPropertyType,
} from "../utils";
import type { PrismaClient } from "@prisma/client";

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

function createRandomAddressesEntities(
	randomCoordinates: RandomCoordinate[],
	street: string,
	startIndex: number,
): IAddressEntity[] {
	return randomCoordinates.map((coord, index) => ({
		id: properties[startIndex + index].addressId,
		street: street.split(", Quixadá").join(""),
		addressNumber: index + 1,
		lat: coord.randomLat,
		lon: coord.randomLon,
	}));
}

async function createAddress(address: IAddressEntity, prismaClient: PrismaClient): Promise<IAddressEntity> {
	const location = `POINT(${address.lon} ${address.lat})`;
	const newAddressResult: IAddressEntity[] = await prismaClient.$queryRaw`
        INSERT INTO "Addresses"
        (id, "addressNumber", street, lat, lon, location)
        VALUES (
          ${address.id},
          ${address.addressNumber},
          ${address.street},
          ${address.lat},
          ${address.lon},
          ST_GeomFromText(${location}, 4326)
        )
        ON CONFLICT DO NOTHING
        RETURNING id, "addressNumber", street, lat, lon;
      `;
	return newAddressResult[0];
}

async function createProperties(
	addresses: IAddressEntity[],
	landlordId: string,
	prismaClient: PrismaClient,
	startIndex: number,
) {
	const { width, depth } = generateRandomDimensions();

	const propertiesToCreate = addresses.map((address, index) => {
		const propertyIndex = startIndex + index;

		return {
			id: properties[propertyIndex].propertyId,
			bathrooms: generateRandomBathrooms(),
			bedrooms: generateRandomBedrooms(),
			width,
			depth,
			photosUrl: "",
			price: generateRandomPrice(),
			status: PropertyStatus.FREE,
			title: properties[propertyIndex].title,
			landlordId,
			addressId: address.id,
			type: generateRandomPropertyType(),
			description: properties[propertyIndex].description,
		};
	});

	for await (const propertyToCreate of propertiesToCreate) {
		await prismaClient.properties.upsert({
			where: { id: propertyToCreate.id },
			update: {},
			create: {
				...propertyToCreate,
				amenities: {
					connect: generateRandomAmenities().map((label) => {
						return { label };
					}),
				},
			},
		});
	}
}

export async function generateAddresses(landlordId: string, prismaClient: PrismaClient) {
	let propertyIndex = 0;

	for (const streetGeoJson of streetGeoJsonList) {
		const streetRandomCoordinates = generateRandomCoordinatesALot(streetGeoJson);
		const addressesEntities = createRandomAddressesEntities(
			streetRandomCoordinates,
			streetGeoJson.street,
			propertyIndex,
		);

		try {
			const addresses = await Promise.all(addressesEntities.map((address) => createAddress(address, prismaClient)));

			await createProperties(addresses, landlordId, prismaClient, propertyIndex);

			if (addresses !== undefined) {
				console.log(`Propriedades geradas para a rua: ${streetGeoJson.street}`);
			}

			propertyIndex += addressesEntities.length;
		} catch (error) {
			console.error(`Erro ao gerar propriedades para a rua ${streetGeoJson.street}:`, error);
		}
	}
}
