import { CreateLandlordUseCase } from "@business/usecases/landlord/createLandlordUseCase";
import { LandlordRepository } from "@framework/repositories/landlordRepository";
import { CryptService } from "@framework/services/cryptService";
import { UniqueIdentifierService } from "@framework/services/uniqueIdentifierService";
import { PrismaClient } from "@prisma/client";

export const makeCreatelandlordUseCase = (): CreateLandlordUseCase => {
	const prismaClient = new PrismaClient();
	const landlordRepository = new LandlordRepository(prismaClient);
	const cryptService = new CryptService();
	const uniqueIdentifierService = new UniqueIdentifierService();

	return new CreateLandlordUseCase(landlordRepository, cryptService, uniqueIdentifierService);
};
