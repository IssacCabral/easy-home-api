import { CreateTenantUseCase } from "@business/usecases/tenant/createTenantUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { LandlordRepository } from "@framework/repositories/landlordRepository";
import { TenantRepository } from "@framework/repositories/tenantRepository";
import { CryptService } from "@framework/services/cryptService";
import { UniqueIdentifierService } from "@framework/services/uniqueIdentifierService";

export const makeCreateTenantUseCase = (): CreateTenantUseCase => {
	const tenantRepository = new TenantRepository(prismaClient);
	const landlordRepository = new LandlordRepository(prismaClient);
	const cryptService = new CryptService();
	const uniqueIdentifierService = new UniqueIdentifierService();

	return new CreateTenantUseCase(tenantRepository, landlordRepository, cryptService, uniqueIdentifierService);
};
