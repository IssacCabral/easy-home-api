import type { IShareRequestEntity } from "@entities/components/tenant/shareRequest/shareRequest";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputSelectShareRequestDto = {
	shareRequestId: string;
};

export type OutputSelectShareRequestDto = Either<IError, IShareRequestEntity>;
