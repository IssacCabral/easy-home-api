import { CloseContactRequestGeneralError, ContactRequestNotFound } from "@business/errors/contactRequest";
import type { CloseContactRequestOperator } from "@controllers/operators/contactRequest/closeContactRequestOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, notFound, ok, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputCloseContactRequestSerializer } from "@controllers/serializers/contactRequest/closeContactRequestSerializer";
import type { IError } from "@shared/iError";

export class CloseContactRequestController implements IController {
	constructor(private readonly operator: CloseContactRequestOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const requestBody = httpRequest.body;
			const input = new InputCloseContactRequestSerializer(requestBody);
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === CloseContactRequestGeneralError) {
					throw new Error(result.value.message);
				}

				if (result.value === ContactRequestNotFound) {
					return notFound(result.value);
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
