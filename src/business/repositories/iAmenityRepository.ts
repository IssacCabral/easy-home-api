import type { IAmenityEntity } from "@entities/components/amenity/amenity";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export interface IAmenityRepository {
	findByIds(ids: string[]): Promise<Either<IError, IAmenityEntity[]>>;
}
