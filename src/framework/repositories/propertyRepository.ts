import type { InputCreateProperty, IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IAddressEntity } from "@entities/components/address/address";
import {
	type BedroomsQuantity,
	PropertyStatus,
	type IPropertyEntity,
	type BathroomsQuantity,
	PropertyTypes,
} from "@entities/components/property/property";
import type { PrismaClient } from "@prisma/client";

export class PropertyRepository implements IPropertyRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async create(input: InputCreateProperty): Promise<IPropertyEntity> {
		console.log("propertyRepository input :>> ", input);

		const location = `POINT(${input.address.lon} ${input.address.lat})`;
		const newAddressResult: IAddressEntity[] = await this.prismaClient.$queryRaw`
          INSERT INTO "Addresses"
          (id, number, street, lat, lon, location)
          VALUES (
						${input.address.id},
            ${input.address.number},
            ${input.address.street},
            ${input.address.lat},
            ${input.address.lon},
            ST_GeomFromText(${location}, 4326)
          )
					RETURNING id, number, street, lat, lon;
        `;
		const address = newAddressResult[0];

		const newProperty = await this.prismaClient.properties.create({
			data: {
				id: input.id,
				bathrooms: input.bathrooms,
				bedrooms: input.bedrooms,
				width: input.width,
				height: input.height,
				photosUrl: input.photosUrl,
				price: input.price,
				status: input.status,
				title: input.title,
				landlordId: input.landlordId,
				addressId: address.id,
				type: input.type,
				description: input.description,
				amenities: {
					connect: input.amenityIds.map((id) => {
						return {
							id,
						};
					}),
				},
			},
			include: {
				address: true,
				amenities: true,
			},
		});

		return {
			id: newProperty.id,
			landlordId: newProperty.landlordId,
			title: newProperty.title,
			status: PropertyStatus[newProperty.status],
			address,
			price: newProperty.price,
			bedrooms: newProperty.bedrooms as BedroomsQuantity,
			bathrooms: newProperty.bathrooms as BathroomsQuantity,
			description: newProperty.description,
			height: newProperty.height,
			width: newProperty.width,
			photosUrl: newProperty.photosUrl,
			amenities: newProperty.amenities,
			type: PropertyTypes[newProperty.type],
		};
	}
}
