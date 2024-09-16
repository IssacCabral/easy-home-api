import type { IAddressRepository, InputCreateAddress } from "@business/repositories/iAddressRepository";
import type { IAddressEntity } from "@entities/components/address/address";
import type { PrismaClient } from "@prisma/client";

export class AddressRepository implements IAddressRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async create(input: InputCreateAddress): Promise<IAddressEntity> {
		const location = `POINT(${input.lon} ${input.lat})`;
		const address: IAddressEntity = await this.prismaClient.$queryRaw`
          INSERT INTO "Addresses"
          (number, street, lat, lon, location)
          VALUES (
            ${input.number},
            ${input.street},
            ${input.lat},
            ${input.lon},
            ST_GeomFromText(${location}, 4326)
          );
        `;

		return address;
	}

	async findByCoordinates(lat: number, lon: number): Promise<IAddressEntity | null> {
		throw new Error("Method not implemented.");
	}
}
