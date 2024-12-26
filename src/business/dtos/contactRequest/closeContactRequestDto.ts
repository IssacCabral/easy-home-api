import type { IContactRequestEntity } from "@entities/components/contactRequest/contactRequest";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputCloseContactRequestDto = {
	id: string;
	reason?: string;
};

export type OutputCloseContactRequestDto = Either<IError, IContactRequestEntity>;
