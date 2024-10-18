import { GetAllAmenitiesController } from "@controllers/components/amenity/getAllAmenitiesController";
import { makeGetAllAmenitiesOperator } from "../../operators/amenity/getAllAmenitiesOperatorFactory";

export const makeGetAllAmenitiesController = (): GetAllAmenitiesController => {
	return new GetAllAmenitiesController(makeGetAllAmenitiesOperator());
};
