import type { IAmenityRepository } from "@business/repositories/iAmenityRepository";
import type { IAmenityEntity } from "@entities/components/amenity/amenity";
import type { PrismaClient } from "@prisma/client";
import { right, type Either } from "@shared/either";
import type { IError } from "@shared/iError";

export class AmenityRepository implements IAmenityRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async findById(id: string): Promise<IAmenityEntity | null> {
		throw new Error("Method not implemented.");
	}

	async findByIds(ids: string[]): Promise<Either<IError, IAmenityEntity[]>> {
		const amenities = await this.prismaClient.amenities.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});

		return right(amenities);
	}
}
