import { PropertyNotFound } from "@business/errors/property";
import { FindShareRequestsGeneralError } from "@business/errors/shareRequest";
import type { FindShareRequestsOperator } from "@controllers/operators/tenant/shareRequest/findShareRequestsOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, notFound, ok, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputFindShareRequestsSerializer } from "@controllers/serializers/tenant/shareRequest/findShareRequestsSerializer";
import type { IError } from "@shared/iError";

export class FindShareRequestsController implements IController {
	constructor(private readonly operator: FindShareRequestsOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { propertyId } = httpRequest.params!;
			const input = new InputFindShareRequestsSerializer({
				propertyId,
			});

			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === FindShareRequestsGeneralError) {
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
