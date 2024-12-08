import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputLoginDto = {
	email: string;
	password: string;
};

export type OutputLogin = {
	accessToken: string;
	email: string;
	name: string;
	isLandlord: boolean;
};

export type OutputLoginDto = Either<IError, OutputLogin>;
