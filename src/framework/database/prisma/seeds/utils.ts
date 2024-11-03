import { PropertyTypes } from "@entities/components/property/property";
import { amenities } from "./data/data.json";

function getRandomElement<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

export function generateRandomPrice(): number {
	return Math.floor(Math.random() * (1000 - 300 + 1)) + 300; // Preço entre 300 e 1000
}

export function generateRandomBedrooms(): number {
	return Math.floor(Math.random() * (6 - 1 + 1)) + 1; // Entre 1 e 6 quartos
}

export function generateRandomBathrooms(): number {
	return Math.floor(Math.random() * (4 - 1 + 1)) + 1; // Entre 1 e 4 banheiros
}

export function generateRandomDimensions(): { depth: number; width: number } {
	const depth = Math.floor(Math.random() * (30 - 10 + 1)) + 10; // Profundidade entre 10 e 30
	const width = Math.floor(Math.random() * (10 - 3 + 1)) + 3; // Largura entre 3 e 10
	return { depth, width };
}

export function generateRandomPropertyType(): PropertyTypes {
	const propertyTypes = Object.values(PropertyTypes);
	return getRandomElement(propertyTypes);
}

export function generateRandomAmenities(): string[] {
	// Decide quantas amenities serão selecionadas (pelo menos 1, no máximo todas)
	const numberOfAmenities = Math.floor(Math.random() * amenities.length) + 1;

	// Embaralha as amenities disponíveis e pega apenas o número desejado
	const shuffledAmenities = amenities.sort(() => 0.5 - Math.random());

	return shuffledAmenities.slice(0, numberOfAmenities);
}
