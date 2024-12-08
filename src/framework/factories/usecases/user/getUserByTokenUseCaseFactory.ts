import { GetUserByTokenUseCase } from "@business/usecases/users/getUserByTokenUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { LandlordRepository } from "@framework/repositories/landlordRepository";
import { TenantRepository } from "@framework/repositories/tenantRepository";
import { JwtService } from "@framework/services/jwtService";

export const makeGetUserByTokenUseCase = (): GetUserByTokenUseCase => {
	const jwtService = new JwtService();
	const tenantRepository = new TenantRepository(prismaClient);
	const landlordRepository = new LandlordRepository(prismaClient);

	return new GetUserByTokenUseCase(jwtService, tenantRepository, landlordRepository);
};
