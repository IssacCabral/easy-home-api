import { FinishShareRequestGeneralError, ShareRequestNotFound } from "@business/errors/shareRequest";
import type { FinishShareRequestOperator } from "@controllers/operators/tenant/shareRequest/finishShareRequestOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, created, notFound, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputFinishShareRequestSerializer } from "@controllers/serializers/tenant/shareRequest/finishShareRequestSerializer";
import type { IError } from "@shared/iError";

export class FinishShareRequestController implements IController {
	constructor(private readonly operator: FinishShareRequestOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { id } = httpRequest.params!;
			const requestBody = httpRequest.body;
			const input = new InputFinishShareRequestSerializer({ ...requestBody, shareRequestId: id });

			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === FinishShareRequestGeneralError) {
					throw new Error(result.value.message);
				}

				if (result.value === ShareRequestNotFound) {
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
