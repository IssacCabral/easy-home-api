import type { IShareRequestEntity } from "@entities/components/tenant/shareRequest/shareRequest";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputFindShareRequestsDto = {
	propertyId: string;
};

export type OutputFindShareRequestsDto = Either<IError, IShareRequestEntity[]>;
