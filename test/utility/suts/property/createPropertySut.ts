import type { IAmenityRepository } from "@business/repositories/iAmenityRepository";
import type { ILandlordRepository } from "@business/repositories/iLandlordRepository";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IUniqueIdentifierService } from "@business/services/iUniqueIdentifierService";
import { CreatePropertyUseCase } from "@business/usecases/property/createPropertyUseCase";
import { makeAmenityRepositoryStub } from "@test/utility/stubs/repositories/amenityRepositoryStub";
import { makeLandLordRepositoryStub } from "@test/utility/stubs/repositories/landlordRepositoryStub";
import { makePropertyRepositoryStub } from "@test/utility/stubs/repositories/propertyRepositoryStub";
import { makeUniqueIdentifierServiceStub } from "@test/utility/stubs/services/uniqueIdentifierServiceStub";

interface CreatePropertySut {
	sut: CreatePropertyUseCase;
	landlordRepositoryStub: ILandlordRepository;
	propertyRepositoryStub: IPropertyRepository;
	amenityRepositoryStub: IAmenityRepository;
	uniqueIdentifierServiceStub: IUniqueIdentifierService;
}

export const makeCreatePropertySut = (): CreatePropertySut => {
	const landlordRepositoryStub = makeLandLordRepositoryStub();
	const propertyRepositoryStub = makePropertyRepositoryStub();
	const amenityRepositoryStub = makeAmenityRepositoryStub();
	const uniqueIdentifierServiceStub = makeUniqueIdentifierServiceStub();

	const sut = new CreatePropertyUseCase(
		landlordRepositoryStub,
		propertyRepositoryStub,
		amenityRepositoryStub,
		uniqueIdentifierServiceStub,
	);

	return {
		sut,
		landlordRepositoryStub,
		propertyRepositoryStub,
		amenityRepositoryStub,
		uniqueIdentifierServiceStub,
	};
};
