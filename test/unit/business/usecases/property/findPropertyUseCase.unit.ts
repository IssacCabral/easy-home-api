import type { InputFindPropertyDto } from "@business/dtos/property/findPropertyDto";
import { FindPropertyGeneralError, PropertyNotFound } from "@business/errors/property";
import { fakePropertyEntity } from "@test/utility/fakes/propertyEntity";
import { makeFindPropertySut } from "@test/utility/suts/property/findPropertySut";

describe("FindPropertUseCase", () => {
	const input: InputFindPropertyDto = {
		id: "0196d70d-51f7-4b24-90b7-ea6b2e7adc8a",
	};

	it("should fail if findById throws an exception", async () => {
		const { sut, propertyRepository } = makeFindPropertySut();

		jest.spyOn(propertyRepository, "findById").mockImplementationOnce(() => {
			throw new Error("error");
		});

		const result = await sut.exec(input);

		expect(result.isRight()).toBeFalsy();
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(FindPropertyGeneralError);
	});

	it("should calls findById with correct input", async () => {
		const { sut, propertyRepository } = makeFindPropertySut();
		const spy = jest.spyOn(propertyRepository, "findById");

		await sut.exec(input);

		expect(spy).toHaveBeenCalledWith(input.id);
	});

	it("should return left if property is not found", async () => {
		const { sut, propertyRepository } = makeFindPropertySut();

		jest.spyOn(propertyRepository, "findById").mockResolvedValueOnce(null);

		const result = await sut.exec(input);

		expect(result.isLeft()).toBeTruthy();
		expect(result.isRight()).toBeFalsy();
		expect(result.value).toEqual(PropertyNotFound);
	});

	it("should find a property on success", async () => {
		const { sut } = makeFindPropertySut();
		const result = await sut.exec(input);

		expect(result.isLeft()).toBeFalsy();
		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual(fakePropertyEntity);
	});
});
