import type { OutputGetAllAmenitiesDto } from "@business/dtos/amenity/getAllAmenitiesDto";
import { GetAllAmenitiesGeneralError } from "@business/errors/amenity";
import type { IAmenityRepository } from "@business/repositories/iAmenityRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { left, right } from "@shared/either";

export class GetAllAmenitiesUseCase implements IUseCase<void, OutputGetAllAmenitiesDto> {
	constructor(private readonly amenityRepository: IAmenityRepository) {}

	async exec(): Promise<OutputGetAllAmenitiesDto> {
		try {
			const amenities = await this.amenityRepository.getAll();
			return right(amenities);
		} catch (err) {
			return left(GetAllAmenitiesGeneralError);
		}
	}
}
