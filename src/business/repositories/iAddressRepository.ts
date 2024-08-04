import type { IAddressEntity } from "@entities/components/address/address";

export type InputCreateAddress = {
	id: string;
	number: number;
	street: string;
	lat: string;
	lon: string;
};

export interface IAddressRepository {
	create(input: InputCreateAddress): Promise<IAddressEntity>;
	findByCoordinates(lat: number, lon: number): Promise<IAddressEntity | undefined>;
}
