import type { ILandlordRepository, InputCreateLandlord } from "@business/repositories/iLandlordRepository";
import type { ILandlordEntity } from "@entities/components/landlord/landlord";
import { fakeLandlordEntity } from "@test/utility/fakes/landlordEntity";

class LandlordRepositoryStub implements ILandlordRepository {
	async create(input: InputCreateLandlord): Promise<ILandlordEntity> {
		return fakeLandlordEntity;
	}

	async findByEmail(email: string): Promise<ILandlordEntity | null> {
		return fakeLandlordEntity;
	}

	async findById(id: string): Promise<ILandlordEntity | null> {
		return fakeLandlordEntity;
	}
}

export const makeLandLordRepositoryStub = (): ILandlordRepository => {
	return new LandlordRepositoryStub();
};
