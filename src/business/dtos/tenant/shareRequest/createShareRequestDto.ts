import type { IShareRequestEntity } from "@entities/components/tenant/shareRequest/shareRequest";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputCreateShareRequestDto = {
	propertyId: string;
	tenantId: string;
};

export type OutputCreateShareRequestDto = Either<IError, IShareRequestEntity>;
