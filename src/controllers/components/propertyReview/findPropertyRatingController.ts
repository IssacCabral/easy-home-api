import { PropertyNotFound } from "@business/errors/property";
import { FindPropertyRatingGeneralError } from "@business/errors/propertyReview";
import type { FindPropertyRatingOperator } from "@controllers/operators/propertyReview/findPropertyRatingOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, notFound, ok, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputFindPropertyRatingSerializer } from "@controllers/serializers/propertyReview/findPropertyRatingSerializer";
import type { IError } from "@shared/iError";

export class FindPropertyRatingController implements IController {
	constructor(private readonly operator: FindPropertyRatingOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { propertyId } = httpRequest.params;
			const input = new InputFindPropertyRatingSerializer({
				propertyId,
			});
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === FindPropertyRatingGeneralError) {
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
