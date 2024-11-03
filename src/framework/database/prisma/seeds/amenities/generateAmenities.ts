import type { PrismaClient } from "@prisma/client";
import { amenities } from "../data/data.json";
import { randomUUID } from "node:crypto";

export async function generateAmenities(prismaClient: PrismaClient) {
	for (const amenity of amenities) {
		await prismaClient.amenities.upsert({
			where: { label: amenity },
			update: {},
			create: {
				id: randomUUID(),
				label: amenity,
			},
		});
	}
}
