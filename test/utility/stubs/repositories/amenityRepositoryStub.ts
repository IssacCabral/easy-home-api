import type { IAmenityRepository } from "@business/repositories/iAmenityRepository";
import type { IAmenityEntity } from "@entities/components/amenity/amenity";
import { right, type Either } from "@shared/either";
import type { IError } from "@shared/iError";
import { fakeAmenityEntity } from "@test/utility/fakes/amenityEntity";

class AmenityRepositoryStub implements IAmenityRepository {
	async findByIds(ids: string[]): Promise<Either<IError, IAmenityEntity[]>> {
		return right([fakeAmenityEntity]);
	}

	async getAll(): Promise<IAmenityEntity[]> {
		return [fakeAmenityEntity, fakeAmenityEntity];
	}
}

export const makeAmenityRepositoryStub = (): IAmenityRepository => {
	return new AmenityRepositoryStub();
};
