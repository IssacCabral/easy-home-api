import { InvalidCredentialsError, LoginGeneralError } from "@business/errors/auth";
import type { LoginOperator } from "@controllers/operators/auth/loginOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, ok, serverError, unauthorized } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputLoginSerializer } from "@controllers/serializers/auth/loginSerializer";
import type { IError } from "@shared/iError";

export class LoginController implements IController {
	constructor(private readonly operator: LoginOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const requestBody = httpRequest.body!;
			const input = new InputLoginSerializer(requestBody);
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === LoginGeneralError) {
					throw new Error(result.value.message);
				}

				if (result.value === InvalidCredentialsError) {
					return unauthorized(result.value)
				}

				return badRequest(result.value);
			}

			return ok(result.value);
		} catch (err) {
			if (err instanceof Error) {
				return serverError(err.message);
			}
			return badRequest(err as IError);
		}
	}
}
