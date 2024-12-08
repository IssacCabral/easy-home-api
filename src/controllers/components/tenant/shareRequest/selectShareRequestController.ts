import { SelectShareRequestGeneralError, ShareRequestNotFound } from "@business/errors/shareRequest";
import type { SelectShareRequestOperator } from "@controllers/operators/tenant/shareRequest/selectShareRequestOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, created, notFound, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputSelectShareRequestSerializer } from "@controllers/serializers/tenant/shareRequest/selectShareRequestSerializer";
import type { IError } from "@shared/iError";

export class SelectShareRequestController implements IController {
	constructor(private readonly operator: SelectShareRequestOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { id } = httpRequest.params!;
			const input = new InputSelectShareRequestSerializer({
				shareRequestId: id,
			});
			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === SelectShareRequestGeneralError) {
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
