import { GetAllAmenitiesGeneralError } from "@business/errors/amenity";
import { fakeAmenityEntity } from "@test/utility/fakes/amenityEntity";
import { makeGetAllAmenitiesSut } from "@test/utility/suts/amenity/getAllAmenitiesSut";

describe("GetAllAmenitiesUseCase", () => {
	it("should fail if getAll throws an exception", async () => {
		const { sut, amenityRepository } = makeGetAllAmenitiesSut();

		jest.spyOn(amenityRepository, "getAll").mockImplementationOnce(() => {
			throw new Error("error");
		});

		const result = await sut.exec();

		expect(result.isRight()).toBeFalsy();
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(GetAllAmenitiesGeneralError);
	});

	it("should get amenities on success", async () => {
		const { sut } = makeGetAllAmenitiesSut();
		const result = await sut.exec();

		expect(result.isLeft()).toBeFalsy();
		expect(result.isRight()).toBeTruthy();
		expect(result.value).toMatchObject([fakeAmenityEntity, fakeAmenityEntity]);
	});
});
