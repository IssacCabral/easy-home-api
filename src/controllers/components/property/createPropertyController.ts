import { AmenitiesNotFound } from "@business/errors/amenity";
import { LandlordNotFound } from "@business/errors/landlord";
import { CreatePropertyGeneralError } from "@business/errors/property";
import type { CreatePropertyOperator } from "@controllers/operators/property/createPropertyOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, created, notFound, serverError } from "@controllers/protocols/httpStatus";
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
				if (result.value === CreatePropertyGeneralError) {
					throw new Error(result.value.message);
				}

				if (result.value === LandlordNotFound || result.value.code === AmenitiesNotFound().code) {
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
