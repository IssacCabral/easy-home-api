import type { ILandlordRepository } from "@business/repositories/iLandlordRepository";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import { FindLandlordPropertiesUseCase } from "@business/usecases/property/findLandlordPropertiesUseCase";
import { makeLandLordRepositoryStub } from "@test/utility/stubs/repositories/landlordRepositoryStub";
import { makePropertyRepositoryStub } from "@test/utility/stubs/repositories/propertyRepositoryStub";

interface FindLandlordPropertiesSut {
	sut: FindLandlordPropertiesUseCase;
	landlordRepository: ILandlordRepository;
	propertyRepository: IPropertyRepository;
}

export const makeFindLandlordPropertiesSut = (): FindLandlordPropertiesSut => {
	const landlordRepository = makeLandLordRepositoryStub();
	const propertyRepository = makePropertyRepositoryStub();
	const sut = new FindLandlordPropertiesUseCase(propertyRepository, landlordRepository);

	return {
		sut,
		landlordRepository,
		propertyRepository,
	};
};
