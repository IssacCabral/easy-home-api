import type {
	IPropertyRepository,
	InputCreateProperty,
	InputFindAddress,
	InputFindLandlordProperties,
	InputFindManyProperties,
	InputSaveTenantOnProperty,
	OutputFindLandlordProperties,
	OutputFindManyProperties,
} from "@business/repositories/iPropertyRepository";
import type { IAddressEntity } from "@entities/components/address/address";
import { type IPropertyEntity, PropertyStatus, PropertyTypes } from "@entities/components/property/property";
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
		const { lat, lon, street, addressNumber } = input;

		return await this.prismaClient.addresses.findFirst({
			where: {
				OR: [
					{
						lat,
						lon,
					},
					{
						street,
						addressNumber,
					},
				],
			},
		});
	}

	async findMany(input: InputFindManyProperties): Promise<OutputFindManyProperties> {
		const filters = this.buildFilters(input);
		const filterQuery = filters.length > 0 ? `AND ${filters.join(" AND ")}` : "";

		console.log("inputFindManyy:", input);

		const properties = await this.prismaClient.$queryRawUnsafe<IPropertyEntity[]>(`
			SELECT 
				p.*,
				jsonb_build_object(
					'id', a.id,
					'addressNumber', a."addressNumber",
					'street', a.street,
					'lat', a.lat,
					'lon', a.lon
				) as address,
				COALESCE(
					jsonb_agg(
						jsonb_build_object(
							'id', am.id,
							'label', am.label
						)
					) FILTER (WHERE am.id IS NOT NULL),
					'[]'
				) as amenities
			FROM "Properties" p
			INNER JOIN "Addresses" a ON p."addressId" = a.id
			LEFT JOIN "_AmenitiesToProperties" ap ON p.id = ap."B"
			LEFT JOIN "Amenities" am ON ap."A" = am.id
			WHERE ST_DWithin(
				a.location,
				ST_SetSRID(ST_MakePoint(${input.centralLon}, ${input.centralLat}), 4326),
				${input.radiusInMeters}
			)
			${filterQuery}
			GROUP BY p.id, a.id
			LIMIT ${input.limit}
			OFFSET ${(input.page - 1) * input.limit}
		`);

		const totalResult = await this.prismaClient.$queryRawUnsafe<{ total: number }[]>(`
			SELECT COUNT(DISTINCT p.id) as total
				FROM "Properties" p
				INNER JOIN "Addresses" a ON p."addressId" = a.id
				LEFT JOIN "_AmenitiesToProperties" ap ON p.id = ap."B"
				LEFT JOIN "Amenities" am ON ap."A" = am.id
				WHERE ST_DWithin(
					a.location,
					ST_SetSRID(ST_MakePoint(${input.centralLon}, ${input.centralLat}), 4326),
					${input.radiusInMeters}
				)
				${filterQuery}
		`);

		const total = Number(totalResult[0].total);

		return {
			meta: {
				page: input.page,
				limit: input.limit,
				total,
				hasNext: input.page * input.limit < total,
			},
			data: properties.map((property) => this.mapper(property)),
		};
	}

	async findById(id: string): Promise<IPropertyEntity | null> {
		const property = await this.prismaClient.properties.findUnique({
			where: { id },
			include: { amenities: true, address: true },
		});

		return property ? this.mapper(property as IPropertyEntity) : null;
	}

	async findLandlordProperties(input: InputFindLandlordProperties): Promise<OutputFindLandlordProperties> {
		const landlordProperties = await this.prismaClient.properties.findMany({
			where: {
				landlordId: input.landlordId,
				title: input.title ? { contains: input.title, mode: "insensitive" } : undefined,
				status: input.status || undefined,
				tenants: input.tenantName
					? {
							some: {
								isMainTenant: true,
								AND: {
									tenant: {
										name: { contains: input.tenantName, mode: "insensitive" },
									},
								},
							},
						}
					: undefined,
			},
			take: input.limit,
			skip: (input.page - 1) * input.limit,
			include: {
				address: true,
				amenities: true,
				tenants: {
					include: {
						tenant: true,
					},
					where: {
						isMainTenant: true,
					},
				},
			},
		});

		const total = await this.prismaClient.properties.count({
			where: {
				landlordId: input.landlordId,
				title: input.title ? { contains: input.title, mode: "insensitive" } : undefined,
				status: input.status || undefined,
				tenants: input.tenantName
					? {
							some: {
								isMainTenant: true,
								AND: {
									tenant: {
										name: { contains: input.tenantName, mode: "insensitive" },
									},
								},
							},
						}
					: undefined,
			},
		});

		return {
			meta: {
				page: input.page,
				limit: input.limit,
				total,
				hasNext: input.page * input.limit < total,
			},
			data: landlordProperties.map((property) =>
				this.mapper({
					...property,
					tenants: property.tenants.map((tenant) => {
						return {
							id: tenant.tenant.id,
							email: tenant.tenant.email,
							name: tenant.tenant.name,
							phone: tenant.tenant.phone,
							isMainTenant: tenant.isMainTenant,
						};
					}),
				} as IPropertyEntity),
			),
		};
	}

	private buildFilters(input: InputFindManyProperties): string[] {
		const filters: string[] = [];

		if (input.minPrice) {
			filters.push(`p.price >= ${input.minPrice}`);
		}
		if (input.maxPrice) {
			filters.push(`p.price <= ${input.maxPrice}`);
		}

		if (input.minBedrooms) {
			filters.push(`p.bedrooms >= ${input.minBedrooms}`);
		}
		if (input.maxBedrooms) {
			filters.push(`p.bedrooms <= ${input.maxBedrooms}`);
		}

		if (input.status) {
			filters.push(`p.status = '${input.status}'`);
		}

		if (input.type) {
			filters.push(`p.type = '${input.type}'`);
		}

		if (input.amenities && input.amenities.length > 0) {
			const amenitiesCondition = input.amenities
				.map(
					(amenity) => `
				EXISTS (
					SELECT 1 FROM "_AmenitiesToProperties" ap
					INNER JOIN "Amenities" a ON a.id = ap."A"
					WHERE ap."B" = p.id AND a.label = '${amenity}'
				)
			`,
				)
				.join(" AND ");

			filters.push(`(${amenitiesCondition})`);
		}

		return filters;
	}

	private async createAddress(address: IAddressEntity): Promise<IAddressEntity> {
		const location = `POINT(${address.lon} ${address.lat})`;
		const newAddressResult: IAddressEntity[] = await this.prismaClient.$queryRaw`
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
					RETURNING id, "addressNumber", street, lat, lon;
        `;
		return newAddressResult[0];
	}

	async saveTenantOnProperty(input: InputSaveTenantOnProperty): Promise<void> {
		await this.prismaClient.tenantsOnProperties.create({
			data: {
				propertyId: input.propertyId,
				tenantId: input.tenantId,
				isMainTenant: input.isMainTenant,
			},
		});

		await this.prismaClient.properties.update({
			where: { id: input.propertyId },
			data: { status: PropertyStatus.BUSY },
		});
	}

	private mapper(property: IPropertyEntity): IPropertyEntity {
		return {
			id: property.id,
			landlordId: property.landlordId,
			title: property.title,
			type: PropertyTypes[property.type],
			status: PropertyStatus[property.status],
			price: property.price,
			bedrooms: property.bedrooms,
			bathrooms: property.bathrooms,
			description: property.description,
			depth: property.depth,
			width: property.width,
			photosUrl: property.photosUrl,
			address: property.address,
			amenities: property.amenities,
			tenants: property.tenants,
			createdAt: property.createdAt,
			updatedAt: property.updatedAt,
		};
	}
}
