import type { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export async function generateLandlord(prismaClient: PrismaClient) {
	const landlord = await prismaClient.landlords.upsert({
		where: { email: "issac@gmail.com" },
		update: {},
		create: {
			id: "d530cb79-8aaa-412e-ae25-18b279e32f96",
			email: "issac@gmail.com",
			name: "Issac Cabral",
			password: await bcrypt.hash("Abc#1234", 12), // todo: change this password when going into production
			phone: "(88) 99838-5580",
		},
	});

	return landlord;
}
