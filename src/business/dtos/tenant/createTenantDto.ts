import type { ITenantEntity } from "@entities/components/tenant/tenant";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputCreateTenantDto = Pick<ITenantEntity, "name" | "phone" | "email" | "password">;

export type OutputCreateTenantDto = Either<IError, Omit<ITenantEntity, "password">>;
