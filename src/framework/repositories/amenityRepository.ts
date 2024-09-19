import { AmenitiesNotFound } from "@business/errors/amenity";
import type { IAmenityRepository } from "@business/repositories/iAmenityRepository";
import type { IAmenityEntity } from "@entities/components/amenity/amenity";
import type { PrismaClient } from "@prisma/client";
import { left, right, type Either } from "@shared/either";
import type { IError } from "@shared/iError";

export class AmenityRepository implements IAmenityRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async findByIds(ids: string[]): Promise<Either<IError, IAmenityEntity[]>> {
		const amenities = await this.prismaClient.amenities.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});

		const foundIds = new Set(amenities.map((amenity) => amenity.id));
		const missingIds = ids.filter((id) => !foundIds.has(id));

		if (missingIds.length > 0) {
			return left(AmenitiesNotFound(missingIds));
		}

		return right(amenities);
	}
}
