import { PropertyNotFound } from "@business/errors/property";
import { FindSharedRentalTenantsGeneralError } from "@business/errors/rentDivision";
import type { FindSharedRentalTenantsOperator } from "@controllers/operators/tenant/rentDivision/findSharedRentalTenantsOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, notFound, ok, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputFindSharedRentalTenantsSerializer } from "@controllers/serializers/tenant/rentDivision/findSharedRentalTenantsSerializer";
import type { IError } from "@shared/iError";

export class FindSharedRentalTenantsController implements IController {
	constructor(private readonly operator: FindSharedRentalTenantsOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { propertyId } = httpRequest.params!;
			const input = new InputFindSharedRentalTenantsSerializer({
				propertyId,
			});
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === FindSharedRentalTenantsGeneralError) {
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
