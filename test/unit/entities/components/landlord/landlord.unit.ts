import { LandlordEntity } from "@entities/components/landlord/landlord";
import { fakeLandlordEntity } from "@test/utility/fakes/landlordEntity";

describe("LandlordEntity", () => {
	it("should create on success", () => {
		const landlordEntity = LandlordEntity.create(fakeLandlordEntity);

		if (landlordEntity.isRight()) {
			expect(landlordEntity.value).toMatchObject({
				name: fakeLandlordEntity.name,
				number: fakeLandlordEntity.number,
				id: fakeLandlordEntity.id,
			});
		}
	});
});
