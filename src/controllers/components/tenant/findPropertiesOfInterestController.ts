import { FindPropertiesOfInterestGeneralError } from "@business/errors/tenant";
import type { FindPropertiesOfInterestOperator } from "@controllers/operators/tenant/findPropertiesOfInterestOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, ok, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputFindPropertiesOfInterestSerializer } from "@controllers/serializers/tenant/findPropertiesOfInterestSerializer";
import type { IError } from "@shared/iError";

export class FindPropertiesOfInterestController implements IController {
	constructor(private readonly operator: FindPropertiesOfInterestOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const tenantId = httpRequest.user?.id;
			const input = new InputFindPropertiesOfInterestSerializer({
				tenantId,
			});
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === FindPropertiesOfInterestGeneralError) {
					throw new Error(result.value.message);
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
