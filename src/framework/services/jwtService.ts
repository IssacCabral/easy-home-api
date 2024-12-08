import { TokenExpiredError, VerifyTokenGeneralError } from "@business/errors/jwt";
import type { IJwtService, TokenPayload, VerifyTokenOutput } from "@business/services/iJwtService";
import { left, right } from "@shared/either";
import JWT from "jsonwebtoken";

export class JwtService implements IJwtService {
	private readonly SECRET = process.env.JWT_SECRET ?? "secret";

	generateToken(payload: TokenPayload): string {
		return JWT.sign(payload, this.SECRET, { expiresIn: "1d" });
	}

	verifyToken(token: string): VerifyTokenOutput {
		try {
			const tokenPayload = JWT.verify(token, process.env.JWT_SECRET_KEY ?? "my-secret") as JWT.JwtPayload;

			return right({
				payload: {
					email: tokenPayload.payload.email,
					userName: tokenPayload.payload.userName,
					isLandlord: tokenPayload.payload.isLandlord,
				},
				exp: tokenPayload.exp,
				iat: tokenPayload.iat,
			});
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			if (error instanceof JWT.TokenExpiredError) {
				return left(TokenExpiredError);
			}
			return left(VerifyTokenGeneralError(error?.message));
		}
	}
}
