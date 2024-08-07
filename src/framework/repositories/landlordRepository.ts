import type { ILandlordRepository, InputCreateLandlord } from "@business/repositories/iLandlordRepository";
import type { ILandlordEntity } from "@entities/components/landlord/landlord";
import type { PrismaClient } from "@prisma/client";

export class LandlordRepository implements ILandlordRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async create(input: InputCreateLandlord): Promise<ILandlordEntity> {
		const newLandlord = await this.prismaClient.landlords.create({
			data: {
				id: input.id,
				email: input.email,
				name: input.name,
				number: input.number,
				password: input.password,
			},
		});

		return newLandlord;
	}

	async findByEmail(email: string): Promise<ILandlordEntity | null> {
		return await this.prismaClient.landlords.findUnique({
			where: { email },
		});
	}

	async findById(id: string): Promise<ILandlordEntity | null> {
		return await this.prismaClient.landlords.findUnique({
			where: { id },
		});
	}
}
