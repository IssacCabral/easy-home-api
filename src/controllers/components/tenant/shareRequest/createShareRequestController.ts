import { PropertyNotFound } from "@business/errors/property";
import { CreateShareRequestGeneralError } from "@business/errors/shareRequest";
import { TenantNotFound } from "@business/errors/tenant";
import type { CreateShareRequestOperator } from "@controllers/operators/tenant/shareRequest/createShareRequestOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, created, notFound, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputCreateShareRequestSerializer } from "@controllers/serializers/tenant/shareRequest/createShareRequestSerializer";
import type { IError } from "@shared/iError";

export class CreateShareRequestController implements IController {
	constructor(private readonly operator: CreateShareRequestOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const requestBody = httpRequest.body;
			const input = new InputCreateShareRequestSerializer(requestBody);
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === CreateShareRequestGeneralError) {
					throw new Error(result.value.message);
				}

				if (result.value === TenantNotFound || result.value === PropertyNotFound) {
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
