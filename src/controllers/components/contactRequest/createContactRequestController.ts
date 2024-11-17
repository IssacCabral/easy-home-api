import { CreateContactRequestGeneralError } from "@business/errors/contactRequest";
import { TenantNotFound } from "@business/errors/tenant";
import type { CreateContactRequestOperator } from "@controllers/operators/contactRequest/createContactRequestOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, created, notFound, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputCreateContactRequestSerializer } from "@controllers/serializers/contactRequest/createContactRequestSerializer";
import type { IError } from "@shared/iError";

export class CreateContactRequestController implements IController {
	constructor(private readonly operator: CreateContactRequestOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const requestBody = httpRequest.body;
			const input = new InputCreateContactRequestSerializer(requestBody);
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === CreateContactRequestGeneralError) {
					throw new Error(result.value.message);
				}

				if (result.value === TenantNotFound) {
					return notFound(result.value);
				}

				return badRequest(result.value);
			}

			return created(result.value);
		} catch (err) {
			if (err instanceof Error) {
				return serverError(err.message);
			}
			return badRequest(err as IError);
		}
	}
}
