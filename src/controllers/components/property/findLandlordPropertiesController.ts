import { LandlordNotFound } from "@business/errors/landlord";
import { FindLandlordPropertiesGeneralError } from "@business/errors/property";
import type { FindLandlordPropertiesOperator } from "@controllers/operators/property/findLandlordPropertiesOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, notFound, ok, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputFindLandlordPropertiesSerializer } from "@controllers/serializers/property/findLandlordPropertiesSerializer";
import type { PropertyStatus } from "@entities/components/property/property";
import type { IError } from "@shared/iError";

export class FindLandlordPropertiesController implements IController {
	constructor(private readonly operator: FindLandlordPropertiesOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const query = httpRequest.query!;
			const { landlordId } = httpRequest.params!;

			const input = new InputFindLandlordPropertiesSerializer({
				landlordId,
				page: Number(query.page),
				limit: Number(query.limit),
				tenantName: query.tenantName as string,
				title: query.title as string,
				status: query.status as PropertyStatus,
			});

			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === FindLandlordPropertiesGeneralError) {
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
