import type { IContactRequestEntity } from "@entities/components/contactRequest/contactRequest";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputRentPropertyDto = {
	contactRequestId: string;
};

export type OutputRentPropertyDto = Either<IError, IContactRequestEntity>;
