import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export interface TokenPayload {
	userId: string;
	userName: string;
	email: string;
	isLandlord: boolean;
}

export interface PayloadResult {
	payload: TokenPayload;
	iat?: number;
	exp?: number;
}

export type VerifyTokenOutput = Either<IError, PayloadResult>;

export interface IJwtService {
	generateToken(payload: TokenPayload): string;
	verifyToken(token: string): VerifyTokenOutput;
}
