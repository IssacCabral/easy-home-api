import type {
	InputCreateProperty,
	InputFindAddress,
	InputFindManyProperties,
	IPropertyRepository,
	OutputFindManyProperties,
} from "@business/repositories/iPropertyRepository";
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

		return this.mapper(newProperty as IPropertyEntity);
	}

	async findAddress(input: InputFindAddress): Promise<IAddressEntity | null> {
		const { lat, lon, street, number } = input;

		return await this.prismaClient.addresses.findFirst({
			where: {
				OR: [
					{
						lat,
						lon,
					},
					{
						street,
						number,
					},
				],
			},
		});
	}

	async findMany(input: InputFindManyProperties): Promise<OutputFindManyProperties> {
		const { limit, page } = input;
		const data = await this.prismaClient.properties.findMany({
			take: limit,
			skip: (page - 1) * limit,
			include: {
				address: true,
				amenities: true,
			},
		});
		const total = await this.prismaClient.properties.count();

		return {
			meta: {
				page,
				limit,
				total,
				hasNext: total > page * limit,
			},
			data: data.map((item) => this.mapper(item as IPropertyEntity)),
		};
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

	private mapper(newProperty: IPropertyEntity): IPropertyEntity {
		return {
			id: newProperty.id,
			landlordId: newProperty.landlordId,
			title: newProperty.title,
			type: PropertyTypes[newProperty.type],
			status: PropertyStatus[newProperty.status],
			price: newProperty.price,
			bedrooms: newProperty.bedrooms,
			bathrooms: newProperty.bathrooms,
			description: newProperty.description,
			depth: newProperty.depth,
			width: newProperty.width,
			photosUrl: newProperty.photosUrl,
			address: newProperty.address,
			amenities: newProperty.amenities,
		};
	}
}
