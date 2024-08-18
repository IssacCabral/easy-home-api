import { TenantEntity } from "@entities/components/tenant/tenant";
import { fakeTenantEntity } from "@test/utility/fakes/tenantEntity";

describe("TenantEntity", () => {
	it("should create on success", () => {
		const tenantEntity = TenantEntity.create(fakeTenantEntity);

		if (tenantEntity.isRight()) {
			expect(tenantEntity.value).toMatchObject({
				name: fakeTenantEntity.name,
				number: fakeTenantEntity.number,
				id: fakeTenantEntity.id,
			});
		}
	});
});
