import { PropertyNotFound } from "@business/errors/property";
import { CreatePropertyReviewGeneralError } from "@business/errors/propertyReview";
import { TenantNotFound } from "@business/errors/tenant";
import type { CreatePropertyReviewOperator } from "@controllers/operators/propertyReview/createPropertyReviewOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, created, notFound, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputCreatePropertyReviewSerializer } from "@controllers/serializers/propertyReview/createPropertyReviewSerializer";
import type { IError } from "@shared/iError";

export class CreatePropertyReviewController implements IController {
	constructor(private readonly operator: CreatePropertyReviewOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const requestBody = httpRequest.body!;
			const input = new InputCreatePropertyReviewSerializer(requestBody);
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === CreatePropertyReviewGeneralError) {
					throw new Error(result.value.message);
				}

				if (result.value === PropertyNotFound || result.value === TenantNotFound) {
					return notFound(result.value);
				}

				return badRequest(result.value);
			}

			return created(result.value);
		} catch (err) {
			if (err instanceof Error) {
				return serverError(err.message);
			}
			return badRequest(err as IError);
		}
	}
}
