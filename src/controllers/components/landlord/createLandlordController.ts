import { CreateLandlordGeneralError } from "@business/errors/landlord";
import type { CreateLandlordOperator } from "@controllers/operators/landlord/createLandlordOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, created, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputCreateLandlordSerializer } from "@controllers/serializers/landlord/createLandlordSerializer";
import type { IError } from "@shared/iError";

export class CreateLandlordController implements IController {
	constructor(private readonly operator: CreateLandlordOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const requestBody = httpRequest.body!;
			const input = new InputCreateLandlordSerializer(requestBody);
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === CreateLandlordGeneralError) {
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
