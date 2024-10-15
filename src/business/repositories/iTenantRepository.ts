import type { ITenantEntity } from "@entities/components/tenant/tenant";

export type InputCreateTenant = {
	id: string;
	name: string;
	phone: string;
	email: string;
	password: string;
};

export interface ITenantRepository {
	create(input: InputCreateTenant): Promise<ITenantEntity>;
	findByEmail(email: string): Promise<ITenantEntity | null>;
	findById(id: string): Promise<ITenantEntity | null>;
}
