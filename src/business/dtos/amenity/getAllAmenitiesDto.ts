import type { IAmenityEntity } from "@entities/components/amenity/amenity";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type OutputGetAllAmenitiesDto = Either<IError, IAmenityEntity[]>;
