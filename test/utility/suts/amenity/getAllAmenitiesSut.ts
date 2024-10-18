import type { IAmenityRepository } from "@business/repositories/iAmenityRepository";
import { GetAllAmenitiesUseCase } from "@business/usecases/amenity/getAllAmenitiesUseCase";
import { makeAmenityRepositoryStub } from "@test/utility/stubs/repositories/amenityRepositoryStub";

interface GetAllAmenitiesSut {
	sut: GetAllAmenitiesUseCase;
	amenityRepository: IAmenityRepository;
}

export const makeGetAllAmenitiesSut = (): GetAllAmenitiesSut => {
	const amenityRepository = makeAmenityRepositoryStub();
	const sut = new GetAllAmenitiesUseCase(amenityRepository);

	return {
		sut,
		amenityRepository,
	};
};
