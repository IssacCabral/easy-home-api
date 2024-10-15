import type { ITenantRepository, InputCreateTenant } from "@business/repositories/iTenantRepository";
import type { ITenantEntity } from "@entities/components/tenant/tenant";
import type { PrismaClient } from "@prisma/client";

export class TenantRepository implements ITenantRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async create(input: InputCreateTenant): Promise<ITenantEntity> {
		const newTenant = await this.prismaClient.tenants.create({
			data: {
				id: input.id,
				email: input.email,
				name: input.name,
				phone: input.phone,
				password: input.password,
			},
		});

		return newTenant;
	}

	async findByEmail(email: string): Promise<ITenantEntity | null> {
		return await this.prismaClient.tenants.findUnique({
			where: { email },
		});
	}

	async findById(id: string): Promise<ITenantEntity | null> {
		return await this.prismaClient.tenants.findUnique({
			where: { id },
		});
	}
}
