import type { InputCreateTenant, ITenantRepository } from "@business/repositories/iTenantRepository";
import type { ITenantEntity } from "@entities/components/tenant/tenant";
import { fakeTenantEntity } from "@test/utility/fakes/tenantEntity";

class TenantRepositoryStub implements ITenantRepository {
	async create(input: InputCreateTenant): Promise<ITenantEntity> {
		return fakeTenantEntity;
	}

	async findByEmail(email: string): Promise<ITenantEntity | null> {
		return fakeTenantEntity;
	}

	async findById(id: string): Promise<ITenantEntity | null> {
		return fakeTenantEntity;
	}
}

export const makeTenantRepositoryStub = (): ITenantRepository => {
	return new TenantRepositoryStub();
};
