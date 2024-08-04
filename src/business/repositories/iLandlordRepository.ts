import type { ILandlordEntity } from "@entities/components/landlord/landlord";

export type InputCreateLandlord = {
	name: string;
	number: string;
	email: string;
	password: string;
};

export interface ILandlordRepository {
	create(input: InputCreateLandlord): Promise<ILandlordEntity>;
}
