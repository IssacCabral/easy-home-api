import type { InputCreatePropertyDto } from "@business/dtos/property/createPropertyDto";
import { CreatePropertyGeneralError } from "@business/errors/property";
import { PropertyTypes } from "@entities/components/property/property";
import { makeCreatePropertySut } from "@test/utility/suts/property/createPropertySut";

describe("CreatePropertyUseCase", () => {
	const input: InputCreatePropertyDto = {
		address: {
			lat: 50,
			lon: 50,
			number: 127,
			street: "Beco da Poeira",
		},
		amenityIds: ["01", "02"],
		bathrooms: 2,
		bedrooms: 2,
		description: "A beautiful house",
		depth: 20,
		landlordId: "00539f9e-a439-45c4-a967-2df677a17879",
		photosUrl: "www.bucket-amazon.com",
		price: 400,
		title: "Casa Rosada",
		type: PropertyTypes.HOUSE,
		width: 20,
	};

	it("should fail if find landlord by id throws an exception", async () => {
		const { sut, landlordRepositoryStub } = makeCreatePropertySut();

		jest.spyOn(landlordRepositoryStub, "findById").mockImplementationOnce(() => {
			throw new Error("error");
		});

		const result = await sut.exec(input);

		expect(result.isRight()).toBeFalsy();
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(CreatePropertyGeneralError);
	});
});
