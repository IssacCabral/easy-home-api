import { ContactRequestNotFound, RentPropertyGeneralError } from "@business/errors/contactRequest";
import type { RentPropertyOperator } from "@controllers/operators/contactRequest/rentPropertyOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, notFound, ok, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputRentPropertySerializer } from "@controllers/serializers/contactRequest/rentPropertySerializer";
import type { IError } from "@shared/iError";

export class RentPropertyController implements IController {
	constructor(private readonly operator: RentPropertyOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const requestBody = httpRequest.body;
			const input = new InputRentPropertySerializer(requestBody);
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === RentPropertyGeneralError) {
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
