import type { OutputGetAllAmenitiesSerializer } from "@controllers/serializers/amenity/getAllAmenitiesSerializer";
import { AbstractOperator } from "../abstractOperator";
import type { GetAllAmenitiesUseCase } from "@business/usecases/amenity/getAllAmenitiesUseCase";

export class GetAllAmenitiesOperator extends AbstractOperator<void, OutputGetAllAmenitiesSerializer> {
	constructor(private readonly getAllAmenitiesUseCase: GetAllAmenitiesUseCase) {
		super();
	}

	protected async run(): Promise<OutputGetAllAmenitiesSerializer> {
		return await this.getAllAmenitiesUseCase.exec();
	}
}
