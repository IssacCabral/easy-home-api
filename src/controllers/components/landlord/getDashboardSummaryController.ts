import { GetDashboardSummaryGeneralError, LandlordNotFound } from "@business/errors/landlord";
import type { GetDashboardSummaryOperator } from "@controllers/operators/landlord/getDashboardSummaryOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, notFound, ok, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputGetDashboardSummarySerializer } from "@controllers/serializers/landlord/getDashboardSummarySerializer";
import type { IError } from "@shared/iError";

export class GetDashboardSummaryController implements IController {
	constructor(private readonly operator: GetDashboardSummaryOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { landlordId } = httpRequest.params!;
			const input = new InputGetDashboardSummarySerializer({
				landlordId,
			});
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === GetDashboardSummaryGeneralError) {
					throw new Error(result.value.message);
				}

				if (result.value === LandlordNotFound) {
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
