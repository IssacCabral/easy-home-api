import { PropertyNotFound } from "@business/errors/property";
import { StopTenantRentDivisionGeneralError } from "@business/errors/rentDivision";
import { TenantNotFoundOnProperty } from "@business/errors/tenant";
import type { StopTenantRentDivisionOperator } from "@controllers/operators/tenant/rentDivision/stopTenantRentDivisionOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, notFound, ok, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputStopTenantRentDivisionSerializer } from "@controllers/serializers/tenant/rentDivision/stopTenantRentDivisionSerializer";
import type { IError } from "@shared/iError";

export class StopTenantRentDivisionController implements IController {
	constructor(private readonly operator: StopTenantRentDivisionOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const body = httpRequest.body!;
			const input = new InputStopTenantRentDivisionSerializer(body);
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === StopTenantRentDivisionGeneralError) {
					throw new Error(result.value.message);
				}

				if (result.value === PropertyNotFound || result.value === TenantNotFoundOnProperty) {
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
