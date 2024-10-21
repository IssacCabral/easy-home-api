import { FindPropertiesGeneralError } from "@business/errors/property";
import type { FindPropertiesOperator } from "@controllers/operators/property/findPropertiesOperator";
import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { badRequest, ok, serverError } from "@controllers/protocols/httpStatus";
import type { IController } from "@controllers/protocols/iController";
import { InputFindPropertiesSerializer } from "@controllers/serializers/property/findPropertiesSerializer";
import type { PropertyStatus, PropertyTypes } from "@entities/components/property/property";
import type { IError } from "@shared/iError";

export class FindPropertiesController implements IController {
	constructor(private readonly operator: FindPropertiesOperator) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { query } = httpRequest;

			const input = new InputFindPropertiesSerializer({
				page: Number(query.page),
				limit: Number(query.limit),
				centralLat: Number(query.centralLat),
				centralLon: Number(query.centralLon),
				radiusInMeters: Number(query.radiusInMeters),
				minPrice: query.minPrice ? Number(query.minPrice) : undefined,
				maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
				minBedrooms: query.minBedrooms ? Number(query.minBedrooms) : undefined,
				maxBedrooms: query.maxBedrooms ? Number(query.maxBedrooms) : undefined,
				status: query.status as PropertyStatus,
				type: query.type as PropertyTypes,
				// Verifica se amenities existe e tenta fazer o parse
				...(query.amenities &&
					(() => {
						try {
							const parsedAmenities = JSON.parse(query.amenities as string);
							return { amenities: parsedAmenities };
						} catch (error) {
							return { amenities: query.amenities };
						}
					})()),
			});

			console.log("inputSerializer:", input);

			const result = await this.operator.exec(input);

			if (result.isLeft()) {
				if (result.value === FindPropertiesGeneralError) {
					throw new Error(result.value.message);
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
