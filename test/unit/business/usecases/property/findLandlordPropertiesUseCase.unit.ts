import type { InputFindLandlordPropertiesDto } from "@business/dtos/property/findLandlordPropertiesDto";
import { LandlordNotFound } from "@business/errors/landlord";
import { FindLandlordPropertiesGeneralError } from "@business/errors/property";
import { fakePropertyEntity } from "@test/utility/fakes/propertyEntity";
import { makeFindLandlordPropertiesSut } from "@test/utility/suts/property/findLandlordPropertiesSut";

describe("FindLandlordPropertiesUseCase", () => {
	const input: InputFindLandlordPropertiesDto = {
		landlordId: "0196d70d-51f7-4b24-90b7-ea6b2e7adc8b",
		limit: 10,
		page: 1,
	};

	it("should fail if findById throws an exception", async () => {
		const { sut, landlordRepository } = makeFindLandlordPropertiesSut();

		jest.spyOn(landlordRepository, "findById").mockImplementationOnce(() => {
			throw new Error("error");
		});

		const result = await sut.exec(input);

		expect(result.isRight()).toBeFalsy();
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(FindLandlordPropertiesGeneralError);
	});

	it("should calls findById with correct input", async () => {
		const { sut, landlordRepository } = makeFindLandlordPropertiesSut();
		const spy = jest.spyOn(landlordRepository, "findById");

		await sut.exec(input);

		expect(spy).toHaveBeenCalledWith(input.landlordId);
	});

	it("should return left if landlord is not found", async () => {
		const { sut, landlordRepository } = makeFindLandlordPropertiesSut();

		jest.spyOn(landlordRepository, "findById").mockResolvedValueOnce(null);

		const result = await sut.exec(input);

		expect(result.isLeft()).toBeTruthy();
		expect(result.isRight()).toBeFalsy();
		expect(result.value).toEqual(LandlordNotFound);
	});

	it("should return landlord properties on success", async () => {
		const { sut } = makeFindLandlordPropertiesSut();

		const result = await sut.exec(input);

		expect(result.isLeft()).toBeFalsy();
		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			meta: {
				hasNext: false,
				limit: 10,
				page: 2,
				total: 3,
			},
			data: [fakePropertyEntity, fakePropertyEntity, fakePropertyEntity],
		});
	});
});
