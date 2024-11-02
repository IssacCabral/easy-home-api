import type { StreetGeoJsonList } from "./seed";

export function generateRandomCoordinates(streetGeoJson: StreetGeoJsonList) {
	const geojsonList = streetGeoJson.geojson;
	const randomGeoJson = geojsonList[Math.floor(Math.random() * geojsonList.length)];

	if (randomGeoJson.type === "LineString") {
		const coordinates = randomGeoJson.coordinates;

		let totalLength = 0;
		const lengths = [];

		for (let i = 0; i < coordinates.length - 1; i++) {
			const [lon1, lat1] = coordinates[i];
			const [lon2, lat2] = coordinates[i + 1];
			const segmentLength = getDistance(lat1, lon1, lat2, lon2);
			totalLength += segmentLength;
			lengths.push(totalLength);
		}

		const randomDistance = Math.random() * totalLength;

		let selectedIndex = 0;
		for (let i = 0; i < lengths.length; i++) {
			if (randomDistance <= lengths[i]) {
				selectedIndex = i;
				break;
			}
		}

		const [lon1, lat1] = coordinates[selectedIndex];
		const [lon2, lat2] = coordinates[selectedIndex + 1];
		const segmentFraction =
			(randomDistance - (lengths[selectedIndex - 1] || 0)) /
			(lengths[selectedIndex] - (lengths[selectedIndex - 1] || 0));

		const randomLat = lat1 + (lat2 - lat1) * segmentFraction;
		const randomLon = lon1 + (lon2 - lon1) * segmentFraction;

		return { randomLat, randomLon };
	}
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
	const R = 6371000; // Raio da Terra em metros
	const φ1 = (lat1 * Math.PI) / 180;
	const φ2 = (lat2 * Math.PI) / 180;
	const Δφ = ((lat2 - lat1) * Math.PI) / 180;
	const Δλ = ((lon2 - lon1) * Math.PI) / 180;

	const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return R * c; // Distância em metros
}
