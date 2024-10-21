import { FindPropertyGeneralError, PropertyNotFound } from "@business/errors/property";
import type { FindPropertyOperator } from "@controllers/operators/property/findPropertyOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, notFound, ok, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputFindPropertySerializer } from "@controllers/serializers/property/findPropertySerializer";
import type { IError } from "@shared/iError";

export class FindPropertyController implements IController {
	constructor(private readonly operator: FindPropertyOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { params } = httpRequest;

			const input = new InputFindPropertySerializer({
				id: params.id,
			});

			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === FindPropertyGeneralError) {
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
