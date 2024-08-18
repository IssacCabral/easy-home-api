import { AddressEntity } from "@entities/components/address/address";
import { InvalidAddressNumber, InvalidCoordinates } from "@entities/errors/address";
import { fakeAddressEntity } from "@test/utility/fakes/addressEntity";

describe("AddressEntity", () => {
	it("should fail if invalid coordinates is provided", () => {
		const addressEntity = AddressEntity.create({
			...fakeAddressEntity,
			lat: 100,
		});

		expect(addressEntity.isLeft()).toBeTruthy();
		expect(addressEntity.isRight()).toBeFalsy();
		expect(addressEntity.value).toEqual(InvalidCoordinates);
	});

	it("should fail if an invalid address number is provided", () => {
		const addressEntity = AddressEntity.create({
			...fakeAddressEntity,
			number: -1,
		});

		expect(addressEntity.isLeft()).toBeTruthy();
		expect(addressEntity.isRight()).toBeFalsy();
		expect(addressEntity.value).toEqual(InvalidAddressNumber);
	});

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
