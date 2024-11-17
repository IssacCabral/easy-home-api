import { PropertyNotFound } from "@business/errors/property";
import { FindPropertyReviewsGeneralError } from "@business/errors/propertyReview";
import type { FindPropertyReviewsOperator } from "@controllers/operators/propertyReview/findPropertyReviewsOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, notFound, ok, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputFindPropertyReviewsSerializer } from "@controllers/serializers/propertyReview/findPropertyReviewsSerializer";
import type { IError } from "@shared/iError";

export class FindPropertyReviewsController implements IController {
	constructor(private readonly operator: FindPropertyReviewsOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { propertyId } = httpRequest.params;
			const input = new InputFindPropertyReviewsSerializer({
				propertyId,
			});
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === FindPropertyReviewsGeneralError) {
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
