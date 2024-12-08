import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputLoginDto = {
	email: string;
	password: string;
};

export type OutputLoginDto = Either<IError, { accessToken: string }>;
