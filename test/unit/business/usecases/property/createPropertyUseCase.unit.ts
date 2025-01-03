import type { InputCreatePropertyDto } from "@business/dtos/property/createPropertyDto";
import { LandlordNotFound } from "@business/errors/landlord";
import { AddressNotAvailable, CreatePropertyGeneralError } from "@business/errors/property";
import { PropertyTypes } from "@entities/components/property/property";
import { InvalidCoordinates } from "@entities/errors/address";
import {
	InvalidBathroomsQuantity,
	InvalidBedroomsQuantity,
	InvalidDepth,
	InvalidWidth,
} from "@entities/errors/property";
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
			addressNumber: 127,
			street: "Beco da Poeira",
		},
		amenityIds: ["01", "02"],
		bathrooms: 2,
		bedrooms: 2,
		description: "A beautiful house",
		depth: 20,
		landlordId: "00539f9e-a439-45c4-a967-2df677a17879",
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

	it("should fail if find address throws an exception", async () => {
		const { sut, propertyRepositoryStub } = makeCreatePropertySut();

		jest.spyOn(propertyRepositoryStub, "findAddress").mockImplementationOnce(() => {
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

	it("should calls findAddress with correct input", async () => {
		const { sut, propertyRepositoryStub } = makeCreatePropertySut();
		const spy = jest.spyOn(propertyRepositoryStub, "findAddress");

		await sut.exec(input);

		expect(spy).toHaveBeenCalledWith({
			lat: input.address.lat,
			lon: input.address.lon,
			street: input.address.street,
			addressNumber: input.address.addressNumber,
		});
	});

	it("should return left if landlord is not found", async () => {
		const { sut, landlordRepositoryStub } = makeCreatePropertySut();

		jest.spyOn(landlordRepositoryStub, "findById").mockResolvedValueOnce(null);

		const result = await sut.exec(input);

		expect(result.isLeft()).toBeTruthy();
		expect(result.isRight()).toBeFalsy();
		expect(result.value).toEqual(LandlordNotFound);
	});

	it("should return left if address is not available", async () => {
		const { sut, propertyRepositoryStub } = makeCreatePropertySut();

		jest.spyOn(propertyRepositoryStub, "findAddress").mockResolvedValueOnce(fakeAddressEntity);

		const result = await sut.exec(input);

		expect(result.isLeft()).toBeTruthy();
		expect(result.isRight()).toBeFalsy();
		expect(result.value).toEqual(AddressNotAvailable);
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

	it("should return left if provides a invalid bathrooms quantity", async () => {
		const { sut } = makeCreatePropertySut();

		const result = await sut.exec({
			...input,
			bathrooms: 11,
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.isRight()).toBeFalsy();
		expect(result.value).toEqual(InvalidBathroomsQuantity);
	});

	it("should return left if provides a invalid bedrooms quantity", async () => {
		const { sut } = makeCreatePropertySut();

		const result = await sut.exec({
			...input,
			bedrooms: 11,
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.isRight()).toBeFalsy();
		expect(result.value).toEqual(InvalidBedroomsQuantity);
	});

	it("should return left if provides a invalid max width", async () => {
		const { sut } = makeCreatePropertySut();

		const result = await sut.exec({
			...input,
			width: 51,
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.isRight()).toBeFalsy();
		expect(result.value).toEqual(InvalidWidth);
	});

	it("should return left if provides a invalid max depth", async () => {
		const { sut } = makeCreatePropertySut();

		const result = await sut.exec({
			...input,
			depth: 101,
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.isRight()).toBeFalsy();
		expect(result.value).toEqual(InvalidDepth);
	});

	it("should create a property on success", async () => {
		const { sut } = makeCreatePropertySut();
		const result = await sut.exec(input);

		expect(result.isLeft()).toBeFalsy();
		expect(result.isRight()).toBeTruthy();
	});
});
