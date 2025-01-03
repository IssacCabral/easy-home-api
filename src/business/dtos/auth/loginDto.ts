import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputLoginDto = {
	email: string;
	password: string;
};

export type OutputLogin = {
	userId: string;
	accessToken: string;
	email: string;
	name: string;
	isLandlord: boolean;
	property?: string;
};

export type OutputLoginDto = Either<IError, OutputLogin>;
