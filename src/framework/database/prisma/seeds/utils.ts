import { PropertyTypes } from "@entities/components/property/property";
import data from "./data.json";

function getRandomElement<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

export function generateRandomTitle(): string {
	return getRandomElement(data.titles);
}

export function generateRandomDescription(): string {
	return getRandomElement(data.descriptions);
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
