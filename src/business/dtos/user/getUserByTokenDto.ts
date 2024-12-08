import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputGetUserByTokenDto = {
	token: string;
};

export interface IUser {
	id: string;
	email: string;
	name: string;
	isLandlord: boolean;
}

export type OutputGetUserByTokenDto = Either<IError, IUser | null>;
