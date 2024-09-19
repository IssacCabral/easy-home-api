import type { FindPropertiesOperator } from "@controllers/operators/property/findPropertiesOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, ok, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputFindPropertiesSerializer } from "@controllers/serializers/property/findPropertiesSerializer";
import type { IError } from "@shared/iError";

export class FindPropertiesController implements IController {
	constructor(private readonly operator: FindPropertiesOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { page, limit } = httpRequest.query;
			const input = new InputFindPropertiesSerializer({
				page: Number(page),
				limit: Number(limit),
			});
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
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
