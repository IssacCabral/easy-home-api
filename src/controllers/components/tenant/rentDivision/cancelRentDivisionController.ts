import { PropertyNotFound } from "@business/errors/property";
import { CancelRentDivisionGeneralError } from "@business/errors/rentDivision";
import type { CancelRentDivisionOperator } from "@controllers/operators/tenant/rentDivision/cancelRentDivisionOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, noContent, notFound, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputCancelRentDivisionSerializer } from "@controllers/serializers/tenant/rentDivision/cancelRentDivisionSerializer";
import type { IError } from "@shared/iError";

export class CancelRentDivisionController implements IController {
	constructor(private readonly operator: CancelRentDivisionOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { propertyId } = httpRequest.params!;
			const input = new InputCancelRentDivisionSerializer({
				propertyId,
			});
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === CancelRentDivisionGeneralError) {
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
