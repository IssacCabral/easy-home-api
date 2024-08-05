import type { IAmenityEntity } from "@entities/components/amenity/amenity";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export interface IAmenityRepository {
	findById(id: string): Promise<IAmenityEntity | undefined>;
	findByIds(ids: string[]): Promise<Either<IError, IAmenityEntity[]>>;
}
