import { TokenExpiredError } from "@business/errors/jwt";
import type { GetUserByTokenUseCase } from "@business/usecases/users/getUserByTokenUseCase";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { ok, serverError, unauthorized } from "@controllers/protocols/httpStatus";
import type { IMiddleware } from "@controllers/protocols/iMiddleware";
import { AuthorizationGeneralError, AuthorizationHeaderNotProvided, TokenNotProvided } from "./errors";

export class AuthMiddleware implements IMiddleware {
	constructor(private readonly getUserByTokenUseCase: GetUserByTokenUseCase) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const authorizationHeader = httpRequest.headers?.authorization;
		if (!authorizationHeader) {
			return unauthorized(AuthorizationHeaderNotProvided);
		}

		const token = authorizationHeader.split(" ")[1];

		if (token === "undefined") {
			return unauthorized(TokenNotProvided);
		}

		const user = await this.getUserByTokenUseCase.exec({ token });
		if (user.isLeft()) {
			if (user.value.code === TokenExpiredError.code) {
				return unauthorized(TokenExpiredError);
			}

			return serverError(AuthorizationGeneralError);
		}

		return ok({ user: user.value });
	}
}
