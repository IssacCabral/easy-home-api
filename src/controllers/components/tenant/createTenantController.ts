import { CreateTenantGeneralError } from "@business/errors/tenant";
import type { CreateTenantOperator } from "@controllers/operators/tenant/createTenantOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, created, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputCreateTenantSerializer } from "@controllers/serializers/tenant/createTenantSerializer";
import type { IError } from "@shared/iError";

export class CreateTenantController implements IController {
	constructor(private readonly operator: CreateTenantOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const requestBody = httpRequest.body!;
			const input = new InputCreateTenantSerializer(requestBody);
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === CreateTenantGeneralError) {
					throw new Error(result.value.message);
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
