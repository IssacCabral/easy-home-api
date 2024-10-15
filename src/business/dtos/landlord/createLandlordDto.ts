import type { ILandlordEntity } from "@entities/components/landlord/landlord";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputCreateLandlordDto = Pick<ILandlordEntity, "name" | "phone" | "email" | "password">;

export type OutputCreateLandlordDto = Either<IError, Omit<ILandlordEntity, "password">>;
