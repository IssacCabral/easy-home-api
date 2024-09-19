import type { CreatePropertyOperator } from "@controllers/operators/property/createPropertyOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, created, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputCreatePropertySerializer } from "@controllers/serializers/property/createPropertySerializer";
import type { IError } from "@shared/iError";

export class CreatePropertyController implements IController {
	constructor(private readonly operator: CreatePropertyOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const requestBody = httpRequest.body;
			const input = new InputCreatePropertySerializer(requestBody);
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
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
