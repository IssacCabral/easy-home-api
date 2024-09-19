import type { InputCreateProperty, IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IAddressEntity } from "@entities/components/address/address";
import { PropertyStatus, type IPropertyEntity, PropertyTypes } from "@entities/components/property/property";
import type { PrismaClient } from "@prisma/client";

export class PropertyRepository implements IPropertyRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async create(input: InputCreateProperty): Promise<IPropertyEntity> {
		const newAddress = await this.createAddress(input.address);
		const newProperty = await this.prismaClient.properties.create({
			data: {
				id: input.id,
				bathrooms: input.bathrooms,
				bedrooms: input.bedrooms,
				width: input.width,
				depth: input.depth,
				photosUrl: input.photosUrl,
				price: input.price,
				status: input.status,
				title: input.title,
				landlordId: input.landlordId,
				addressId: newAddress.id,
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

		return this.propertyMapper({
			newProperty: newProperty as IPropertyEntity,
			newAddress,
		});
	}

	async findAddressByCoordinates(lat: number, lon: number): Promise<IAddressEntity | null> {
		return await this.prismaClient.addresses.findUnique({
			where: {
				lat,
				lon,
			},
		});
	}

	private async createAddress(address: IAddressEntity): Promise<IAddressEntity> {
		const location = `POINT(${address.lon} ${address.lat})`;
		const newAddressResult: IAddressEntity[] = await this.prismaClient.$queryRaw`
          INSERT INTO "Addresses"
          (id, number, street, lat, lon, location)
          VALUES (
						${address.id},
            ${address.number},
            ${address.street},
            ${address.lat},
            ${address.lon},
            ST_GeomFromText(${location}, 4326)
          )
					RETURNING id, number, street, lat, lon;
        `;
		return newAddressResult[0];
	}

	private propertyMapper(data: { newProperty: IPropertyEntity; newAddress: IAddressEntity }): IPropertyEntity {
		return {
			id: data.newProperty.id,
			landlordId: data.newProperty.landlordId,
			title: data.newProperty.title,
			type: PropertyTypes[data.newProperty.type],
			status: PropertyStatus[data.newProperty.status],
			price: data.newProperty.price,
			bedrooms: data.newProperty.bedrooms,
			bathrooms: data.newProperty.bathrooms,
			description: data.newProperty.description,
			depth: data.newProperty.depth,
			width: data.newProperty.width,
			photosUrl: data.newProperty.photosUrl,
			address: data.newAddress,
			amenities: data.newProperty.amenities,
		};
	}
}
