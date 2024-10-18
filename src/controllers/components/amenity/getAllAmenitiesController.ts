import type { GetAllAmenitiesOperator } from "@controllers/operators/amenity/getAllAmenitiesOperator";
import type { HttpResponse } from "@controllers/protocols/http";
import { badRequest, ok, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import type { IError } from "@shared/iError";

export class GetAllAmenitiesController implements IController {
	constructor(private readonly operator: GetAllAmenitiesOperator) {}

	async handle(): Promise<HttpResponse> {
		try {
			const result = await this.operator.exec();

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
