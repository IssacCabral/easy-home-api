import { PropertyEntity } from "@entities/components/property/property";
import {
	InvalidBathroomsQuantity,
	InvalidBedroomsQuantity,
	InvalidDepth,
	InvalidWidth,
} from "@entities/errors/property";
import { fakePropertyEntity } from "@test/utility/fakes/propertyEntity";

describe("PropertyEntity", () => {
	it("should fail if invalid bathrooms quantity is provided", () => {
		const propertyEntity = PropertyEntity.create({
			...fakePropertyEntity,
			bathrooms: 11,
		});

		expect(propertyEntity.isLeft()).toBeTruthy();
		expect(propertyEntity.isRight()).toBeFalsy();
		expect(propertyEntity.value).toEqual(InvalidBathroomsQuantity);
	});

	it("should fail if invalid bedrooms quantity is provided", () => {
		const propertyEntity = PropertyEntity.create({
			...fakePropertyEntity,
			bedrooms: 11,
		});

		expect(propertyEntity.isLeft()).toBeTruthy();
		expect(propertyEntity.isRight()).toBeFalsy();
		expect(propertyEntity.value).toEqual(InvalidBedroomsQuantity);
	});

	it("should fail if invalid width is provided", () => {
		const propertyEntity = PropertyEntity.create({
			...fakePropertyEntity,
			width: 51,
		});

		expect(propertyEntity.isLeft()).toBeTruthy();
		expect(propertyEntity.isRight()).toBeFalsy();
		expect(propertyEntity.value).toEqual(InvalidWidth);
	});

	it("should fail if invalid depth is provided", () => {
		const propertyEntity = PropertyEntity.create({
			...fakePropertyEntity,
			depth: 101,
		});

		expect(propertyEntity.isLeft()).toBeTruthy();
		expect(propertyEntity.isRight()).toBeFalsy();
		expect(propertyEntity.value).toEqual(InvalidDepth);
	});

	it("should create on success", () => {
		const propertyEntity = PropertyEntity.create(fakePropertyEntity);

		if (propertyEntity.isRight()) {
			expect(propertyEntity.value.export()).toMatchObject({
				id: fakePropertyEntity.id,
				address: fakePropertyEntity.address,
				amenities: fakePropertyEntity.amenities,
				bathrooms: fakePropertyEntity.bathrooms,
				bedrooms: fakePropertyEntity.bedrooms,
				description: fakePropertyEntity.description,
				depth: fakePropertyEntity.depth,
				landlordId: fakePropertyEntity.landlordId,
				photosUrl: fakePropertyEntity.photosUrl,
				price: fakePropertyEntity.price,
				status: fakePropertyEntity.status,
				title: fakePropertyEntity.title,
				type: fakePropertyEntity.type,
				width: fakePropertyEntity.width,
			});
		}
	});
});
