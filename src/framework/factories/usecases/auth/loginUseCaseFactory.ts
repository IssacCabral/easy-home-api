import { LoginUseCase } from "@business/usecases/auth/loginUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { LandlordRepository } from "@framework/repositories/landlordRepository";
import { TenantRepository } from "@framework/repositories/tenantRepository";
import { CryptService } from "@framework/services/cryptService";
import { JwtService } from "@framework/services/jwtService";

export const makeLoginUseCase = (): LoginUseCase => {
	const tenantRepository = new TenantRepository(prismaClient);
	const landlordRepository = new LandlordRepository(prismaClient);
	const cryptService = new CryptService();
	const jwtService = new JwtService();

	return new LoginUseCase(tenantRepository, landlordRepository, cryptService, jwtService);
};
