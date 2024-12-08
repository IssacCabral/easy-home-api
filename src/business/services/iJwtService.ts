import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export interface TokenPayload {
	userName: string;
	email: string;
}

export interface PayloadResult {
	payload: TokenPayload;
	iat?: number;
	exp?: number;
}

export type VerifyTokenOutput = Either<IError, PayloadResult>;

export interface IJwtService {
	generateToken(payload: TokenPayload): Promise<string>;
	verifyToken(token: string): Promise<VerifyTokenOutput>;
}
