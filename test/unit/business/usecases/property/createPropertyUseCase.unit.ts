import type { InputCreatePropertyDto } from "@business/dtos/property/createPropertyDto";
import { LandlordNotFound } from "@business/errors/landlord";
import { CoordinatesNotAvailable, CreatePropertyGeneralError } from "@business/errors/property";
import { PropertyTypes } from "@entities/components/property/property";
import { InvalidCoordinates } from "@entities/errors/address";
import { left } from "@shared/either";
import type { IError } from "@shared/iError";
import { fakeAddressEntity } from "@test/utility/fakes/addressEntity";
import { fakeIError } from "@test/utility/fakes/error";
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

	it("should fail if find address by coordinates throws an exception", async () => {
		const { sut, propertyRepositoryStub } = makeCreatePropertySut();

		jest.spyOn(propertyRepositoryStub, "findAddressByCoordinates").mockImplementationOnce(() => {
			throw new Error("error");
		});

		const result = await sut.exec(input);

		expect(result.isRight()).toBeFalsy();
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(CreatePropertyGeneralError);
	});

	it("should calls findLandlordById with correct input", async () => {
		const { sut, landlordRepositoryStub } = makeCreatePropertySut();
		const spy = jest.spyOn(landlordRepositoryStub, "findById");

		await sut.exec(input);

		expect(spy).toHaveBeenCalledWith(input.landlordId);
	});

	it("should calls findAddressByCoordinates with correct input", async () => {
		const { sut, propertyRepositoryStub } = makeCreatePropertySut();
		const spy = jest.spyOn(propertyRepositoryStub, "findAddressByCoordinates");

		await sut.exec(input);

		expect(spy).toHaveBeenCalledWith(input.address.lat, input.address.lon);
	});

	it("should return left if landlord is not found", async () => {
		const { sut, landlordRepositoryStub } = makeCreatePropertySut();

		jest.spyOn(landlordRepositoryStub, "findById").mockResolvedValueOnce(null);

		const result = await sut.exec(input);

		expect(result.isLeft()).toBeTruthy();
		expect(result.isRight()).toBeFalsy();
		expect(result.value).toEqual(LandlordNotFound);
	});

	it("should return left if coordinates is not available", async () => {
		const { sut, propertyRepositoryStub } = makeCreatePropertySut();

		jest.spyOn(propertyRepositoryStub, "findAddressByCoordinates").mockResolvedValueOnce(fakeAddressEntity);

		const result = await sut.exec(input);

		expect(result.isLeft()).toBeTruthy();
		expect(result.isRight()).toBeFalsy();
		expect(result.value).toEqual(CoordinatesNotAvailable);
	});

	it("should fail if find amenities throws an exception", async () => {
		const { sut, amenityRepositoryStub } = makeCreatePropertySut();

		jest.spyOn(amenityRepositoryStub, "findByIds").mockImplementationOnce(() => {
			throw new Error("error");
		});

		const result = await sut.exec(input);

		expect(result.isRight()).toBeFalsy();
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(CreatePropertyGeneralError);
	});

	it("should calls findByIds with correct input", async () => {
		const { sut, amenityRepositoryStub } = makeCreatePropertySut();
		const spy = jest.spyOn(amenityRepositoryStub, "findByIds");

		await sut.exec(input);

		expect(spy).toHaveBeenCalledWith(input.amenityIds);
	});

	it("should return left if find amenities returns left", async () => {
		const { sut, amenityRepositoryStub } = makeCreatePropertySut();
		const fakeError: IError = {
			...fakeIError,
			details: input.amenityIds[1],
		};

		jest.spyOn(amenityRepositoryStub, "findByIds").mockResolvedValueOnce(left(fakeError));

		const result = await sut.exec(input);

		expect(result.isLeft()).toBeTruthy();
		expect(result.isRight()).toBeFalsy();
		expect(result.value).toEqual(fakeError);
	});

	it("should return left if provides a invalid latitude in address", async () => {
		const { sut } = makeCreatePropertySut();

		const result = await sut.exec({
			...input,
			address: {
				...input.address,
				lat: 91, // Invalid latitude, the correct value range is: -90 to 90
			},
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.isRight()).toBeFalsy();
		expect(result.value).toEqual(InvalidCoordinates);
	});

	it("should return left if provides a invalid longitude in address", async () => {
		const { sut } = makeCreatePropertySut();

		const result = await sut.exec({
			...input,
			address: {
				...input.address,
				lat: -181, // Invalid longitude, the correct value range is: -180 a 180
			},
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.isRight()).toBeFalsy();
		expect(result.value).toEqual(InvalidCoordinates);
	});
});
