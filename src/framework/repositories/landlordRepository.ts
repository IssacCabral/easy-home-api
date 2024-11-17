import type {
	ILandlordRepository,
	InputCreateLandlord,
	OutputGetDashboardSummary,
} from "@business/repositories/iLandlordRepository";
import type { ILandlordEntity } from "@entities/components/landlord/landlord";
import { PropertyStatus } from "@entities/components/property/property";
import { ContactRequestStatus, type PrismaClient } from "@prisma/client";

export class LandlordRepository implements ILandlordRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async create(input: InputCreateLandlord): Promise<ILandlordEntity> {
		const newLandlord = await this.prismaClient.landlords.create({
			data: {
				id: input.id,
				email: input.email,
				name: input.name,
				phone: input.phone,
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

	async getDashboardSummary(landlordId: string): Promise<OutputGetDashboardSummary> {
		const busyProperties = await this.prismaClient.properties.count({
			where: {
				landlordId,
				status: PropertyStatus.BUSY,
			},
		});

		const contactRequests = await this.prismaClient.contactRequests.count({
			where: {
				property: {
					landlordId,
				},
				status: ContactRequestStatus.IN_CONTACT,
			},
		});

		const monthlyIncomeResult = await this.prismaClient.properties.aggregate({
			where: {
				landlordId,
				status: PropertyStatus.BUSY,
			},
			_sum: {
				price: true,
			},
		});

		const monthlyIncome = monthlyIncomeResult._sum.price ?? 0;

		return {
			busyProperties,
			contactRequests,
			monthlyIncome,
		};
	}
}
