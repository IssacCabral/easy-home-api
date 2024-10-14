import type { ILandlordEntity } from "@entities/components/landlord/landlord";

export type InputCreateLandlord = {
	id: string;
	name: string;
	phone: string;
	email: string;
	password: string;
};

export interface ILandlordRepository {
	create(input: InputCreateLandlord): Promise<ILandlordEntity>;
	findByEmail(email: string): Promise<ILandlordEntity | null>;
	findById(id: string): Promise<ILandlordEntity | null>;
}
