import { GetAllAmenitiesOperator } from "@controllers/operators/amenity/getAllAmenitiesOperator";
import { makeGetAllAmenitiesUseCase } from "@framework/factories/usecases/amenity/getAllAmenitiesUseCaseFactory";

export const makeGetAllAmenitiesOperator = (): GetAllAmenitiesOperator => {
	return new GetAllAmenitiesOperator(makeGetAllAmenitiesUseCase());
};
