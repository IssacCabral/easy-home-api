import type { ILandlordRepository } from "@business/repositories/iLandlordRepository";
import type { ICryptService } from "@business/services/iCryptService";
import type { IUniqueIdentifierService } from "@business/services/iUniqueIdentifierService";
import { CreateLandlordUseCase } from "@business/usecases/landlord/createLandlordUseCase";
import { makeLandLordRepository } from "@test/utility/stubs/repositories/landlordRepositoryStub";
import { makeCryptService } from "@test/utility/stubs/services/cryptServiceStub";
import { makeUniqueIdentifierService } from "@test/utility/stubs/services/uniqueIdentifierServiceStub";

interface CreateLandlordSut {
	sut: CreateLandlordUseCase;
	landlordRepositoryStub: ILandlordRepository;
	cryptServiceStub: ICryptService;
	uniqueIdentifierServiceStub: IUniqueIdentifierService;
}

export const makeCreateLandlordSut = (): CreateLandlordSut => {
	const landlordRepositoryStub = makeLandLordRepository();
	const cryptServiceStub = makeCryptService();
	const uniqueIdentifierServiceStub = makeUniqueIdentifierService();
	const sut = new CreateLandlordUseCase(landlordRepositoryStub, cryptServiceStub, uniqueIdentifierServiceStub);

	return {
		sut,
		cryptServiceStub,
		landlordRepositoryStub,
		uniqueIdentifierServiceStub,
	};
};
