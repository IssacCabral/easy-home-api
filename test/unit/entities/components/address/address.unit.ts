import { AddressEntity } from "@entities/components/address/address";
import { fakeAddressEntity } from "@test/utility/fakes/addressEntity";

describe("AddressEntity", () => {
	it("should create on success", () => {
		const addressEntity = AddressEntity.create(fakeAddressEntity);

		if (addressEntity.isRight()) {
			expect(addressEntity.value).toMatchObject({
				id: fakeAddressEntity.id,
				lat: fakeAddressEntity.lat,
				lon: fakeAddressEntity.lon,
				number: fakeAddressEntity.number,
				street: fakeAddressEntity.street,
			});
		}
	});
});
