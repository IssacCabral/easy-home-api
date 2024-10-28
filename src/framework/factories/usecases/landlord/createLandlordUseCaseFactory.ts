import { CreateLandlordUseCase } from "@business/usecases/landlord/createLandlordUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { LandlordRepository } from "@framework/repositories/landlordRepository";
import { TenantRepository } from "@framework/repositories/tenantRepository";
import { CryptService } from "@framework/services/cryptService";
import { UniqueIdentifierService } from "@framework/services/uniqueIdentifierService";

export const makeCreatelandlordUseCase = (): CreateLandlordUseCase => {
	const landlordRepository = new LandlordRepository(prismaClient);
	const tenantRepository = new TenantRepository(prismaClient);
	const cryptService = new CryptService();
	const uniqueIdentifierService = new UniqueIdentifierService();

	return new CreateLandlordUseCase(landlordRepository, tenantRepository, cryptService, uniqueIdentifierService);
};
