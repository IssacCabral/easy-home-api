import { CreateTenantGeneralError } from "@business/errors/tenant";
import type { CreateTenantOperator } from "@controllers/operators/tenant/createTenantOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, created, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { validationError } from "@controllers/protocols/validationError";
import { InputCreateTenantSerializer } from "@controllers/serializers/tenant/createTenantSerializer";

export class CreateTenantController implements IController {
	constructor(private readonly operator: CreateTenantOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const requestBody = httpRequest.body;
			const input = new InputCreateTenantSerializer(requestBody);
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === CreateTenantGeneralError) {
					throw result.value;
				}
				return badRequest(result.value);
			}

			return created(result.value);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (err: any) {
			console.log("err :>> ", err);

			if (err?.code === validationError().code) {
				return badRequest(err);
			}
			return serverError(err);
		}
	}
}
