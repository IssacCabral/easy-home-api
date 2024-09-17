import type { CreatePropertyOperator } from "@controllers/operators/property/createPropertyOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, created, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { validationError } from "@controllers/protocols/validationError";
import { InputCreatePropertySerializer } from "@controllers/serializers/property/createPropertySerializer";

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
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (err: any) {
			console.log("err :>>", JSON.stringify(err, null, 2));

			if (err?.code === validationError().code) {
				return badRequest(err);
			}
			return serverError(err);
		}
	}
}
