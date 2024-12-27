import type { IShareRequestEntity } from "@entities/components/tenant/shareRequest/shareRequest";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputFinishShareRequestDto = {
	shareRequestId: string;
	finalizationReason: string;
};

export type OutputFinishShareRequestDto = Either<IError, IShareRequestEntity>;
