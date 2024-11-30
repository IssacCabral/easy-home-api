import { PropertyNotFound } from "@business/errors/property";
import { CompleteRentDivisionGeneralError } from "@business/errors/rentDivision";
import type { CompleteRentDivisionOperator } from "@controllers/operators/tenant/rentDivision/completeRentDivisionOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, noContent, notFound, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputCompleteRentDivisionSerializer } from "@controllers/serializers/tenant/rentDivision/completeRentDivisionSerializer";
import type { IError } from "@shared/iError";

export class CompleteRentDivisionController implements IController {
	constructor(private readonly operator: CompleteRentDivisionOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { propertyId } = httpRequest.params;
			const input = new InputCompleteRentDivisionSerializer({
				propertyId,
			});
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === CompleteRentDivisionGeneralError) {
					throw new Error(result.value.message);
				}

				if (result.value === PropertyNotFound) {
					return notFound(result.value);
				}

				return badRequest(result.value);
			}

			return noContent();
		} catch (err) {
			if (err instanceof Error) {
				return serverError(err.message);
			}
			return badRequest(err as IError);
		}
	}
}
