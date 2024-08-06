import { CreateLandlordGeneralError } from "@business/errors/landlord";
import type { CreateLandlordOperator } from "@controllers/operators/landlord/createLandlordOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, created, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { validationError } from "@controllers/protocols/validationError";
import { InputCreateLandlordSerializer } from "@controllers/serializers/landlord/createLandlordSerializer";

export class CreateLandlordController implements IController {
	constructor(private readonly operator: CreateLandlordOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const requestBody = httpRequest.body;
			const input = new InputCreateLandlordSerializer(requestBody);
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === CreateLandlordGeneralError) {
					throw result.value;
				}
				return badRequest(result.value);
			}

			return created(result.value);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (err: any) {
			if (err?.code === validationError().code) {
				return badRequest(err);
			}
			return serverError(err);
		}
	}
}
