import { TokenExpiredError, VerifyTokenGeneralError } from "@business/errors/jwt";
import type { IJwtService, TokenPayload, VerifyTokenOutput } from "@business/services/iJwtService";
import { left, right } from "@shared/either";
import JWT from "jsonwebtoken";

export class JwtService implements IJwtService {
	private readonly SECRET = process.env.JWT_SECRET_KEY ?? "secret";

	generateToken(payload: TokenPayload): string {
		return JWT.sign(payload, this.SECRET, { expiresIn: "1d" });
	}

	verifyToken(token: string): VerifyTokenOutput {
		try {
			const tokenPayload = JWT.verify(token, this.SECRET) as JWT.JwtPayload;

			return right({
				payload: {
					userId: tokenPayload.userId,
					email: tokenPayload.email,
					userName: tokenPayload.userName,
					isLandlord: tokenPayload.isLandlord,
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
