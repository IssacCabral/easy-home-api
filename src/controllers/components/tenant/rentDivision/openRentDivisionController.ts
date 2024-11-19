import { PropertyNotFound } from "@business/errors/property";
import { OpenRentDivisionGeneralError } from "@business/errors/rentDivision";
import type { OpenRentDivisionOperator } from "@controllers/operators/tenant/rentDivision/openRentDivisionOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, notFound, ok, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputOpenRentDivisionSerializer } from "@controllers/serializers/tenant/rentDivision/openRentDivisionSerializer";
import type { IError } from "@shared/iError";

export class OpenRentDivisionController implements IController {
	constructor(private readonly operator: OpenRentDivisionOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { propertyId } = httpRequest.params;
			const input = new InputOpenRentDivisionSerializer({
				propertyId,
			});
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === OpenRentDivisionGeneralError) {
					throw new Error(result.value.message);
				}

				if (result.value === PropertyNotFound) {
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
