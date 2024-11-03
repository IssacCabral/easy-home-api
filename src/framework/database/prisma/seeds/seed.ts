import { prismaClient } from "../prismaClient";
import { generateAmenities } from "./amenities/generateAmenities";
import { generateLandlord } from "./landlord/generateLandlord";
import { generateAddresses } from "./properties/generateAddresses";

// function delay(ms: number) {
// 	return new Promise((resolve) => setTimeout(resolve, ms));
// }

(async () => {
	await generateAmenities(prismaClient);
	const landlord = await generateLandlord(prismaClient);
	await generateAddresses(landlord.id, prismaClient);

	// criar propriedades
})();
