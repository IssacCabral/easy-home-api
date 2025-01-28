import type { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export async function generateTenants(prismaClient: PrismaClient) {
	await prismaClient.tenants.upsert({
		where: { email: "test@gmail.com" },
		update: {},
		create: {
			id: "4465f4fc-8f74-4157-b828-79bbd125dc54",
			email: "test@gmail.com",
			name: "Test Cabral",
			password: await bcrypt.hash("Abc#1234", 12),
			phone: "(88) 99999-9999",
		},
	});

	await prismaClient.tenants.upsert({
		where: { email: "test2@gmail.com" },
		update: {},
		create: {
			id: "f5f5d650-4a10-478f-862e-5aac0c21b498",
			email: "test2@gmail.com",
			name: "Test2 Cabral",
			password: await bcrypt.hash("Abc#1234", 12),
			phone: "(88) 99999-9999",
		},
	});
}
