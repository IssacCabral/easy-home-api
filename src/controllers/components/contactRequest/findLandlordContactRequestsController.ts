import { FindLandlordContactRequestsGeneralError } from "@business/errors/contactRequest";
import { LandlordNotFound } from "@business/errors/landlord";
import type { FindLandlordContactRequestsOperator } from "@controllers/operators/contactRequest/findLandlordContactRequestsOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, notFound, ok, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputFindLandlordContactRequestsSerializer } from "@controllers/serializers/contactRequest/findLandlordContactRequestsSerializer";
import type { ContactRequestStatus } from "@entities/components/contactRequest/contactRequest";
import type { IError } from "@shared/iError";

export class FindLandlordContactRequestsController implements IController {
	constructor(private readonly operator: FindLandlordContactRequestsOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const query = httpRequest.query!;
			const { landlordId } = httpRequest.params!;

			const input = new InputFindLandlordContactRequestsSerializer({
				landlordId,
				page: Number(query.page),
				limit: Number(query.limit),
				tenantName: query.tenantName as string,
				title: query.title as string,
				status: query.status as ContactRequestStatus,
			});

			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === FindLandlordContactRequestsGeneralError) {
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
