import type { InputCreatePropertyDto, OutputCreatePropertyDto } from "@business/dtos/property/createPropertyDto";
import { LandlordNotFound } from "@business/errors/landlord";
import { AddressNotAvailable, CreatePropertyGeneralError } from "@business/errors/property";
import type { IAmenityRepository } from "@business/repositories/iAmenityRepository";
import type { ILandlordRepository } from "@business/repositories/iLandlordRepository";
import type { IPropertyRepository, InputCreateProperty } from "@business/repositories/iPropertyRepository";
import type { IUniqueIdentifierService } from "@business/services/iUniqueIdentifierService";
import type { IUseCase } from "@business/shared/iUseCase";
import { AddressEntity, type IAddressEntity } from "@entities/components/address/address";
import type { IAmenityEntity } from "@entities/components/amenity/amenity";
import { type IPropertyEntity, PropertyEntity, PropertyStatus } from "@entities/components/property/property";
import { type Either, left, right } from "@shared/either";
import type { IError } from "@shared/iError";

export class CreatePropertyUseCase implements IUseCase<InputCreatePropertyDto, OutputCreatePropertyDto> {
	constructor(
		private readonly landlordRepository: ILandlordRepository,
		private readonly propertyRepository: IPropertyRepository,
		private readonly amenityRepository: IAmenityRepository,
		private readonly uniqueIdentifierService: IUniqueIdentifierService,
	) {}

	async exec(input: InputCreatePropertyDto): Promise<OutputCreatePropertyDto> {
		try {
			console.log("createPropertyUseCase input :>> ", input);

			const { lat, lon, street, addressNumber } = input.address;
			const [landlord, address] = await Promise.all([
				this.landlordRepository.findById(input.landlordId),
				this.propertyRepository.findAddress({ lat, lon, street, addressNumber }),
			]);

			if (!landlord) {
				return left(LandlordNotFound);
			}

			if (address) {
				return left(AddressNotAvailable);
			}

			const amenities = await this.amenityRepository.findByIds(input.amenityIds);
			if (amenities.isLeft()) {
				return left(amenities.value);
			}

			const createdEntities = this.createEntities(input, amenities.value);
			if (createdEntities.isLeft()) {
				return left(createdEntities.value);
			}

			const payload = this.getPayloadToSaveProperty(createdEntities.value.propertyEntity);
			const createdProperty = await this.propertyRepository.create(payload);

			return right(createdProperty);
		} catch (err) {
			console.error(err);
			return left(CreatePropertyGeneralError);
		}
	}

	private createAddressEntity(input: InputCreatePropertyDto): Either<IError, AddressEntity> {
		const { address } = input;

		return AddressEntity.create({
			id: this.uniqueIdentifierService.create(),
			lat: address.lat,
			lon: address.lon,
			addressNumber: address.addressNumber,
			street: address.street,
		});
	}

	private createPropertyEntity(
		input: InputCreatePropertyDto,
		addressEntity: IAddressEntity,
		amenityEntities: IAmenityEntity[],
	): Either<IError, PropertyEntity> {
		return PropertyEntity.create({
			id: this.uniqueIdentifierService.create(),
			bathrooms: input.bathrooms,
			bedrooms: input.bedrooms,
			depth: input.depth,
			width: input.width,
			landlordId: input.landlordId,
			price: input.price,
			title: input.title,
			description: input.description,
			status: PropertyStatus.FREE,
			type: input.type,
			photosUrl: "",
			address: addressEntity,
			amenities: amenityEntities,
		});
	}

	private createEntities(
		input: InputCreatePropertyDto,
		amenityEntities: IAmenityEntity[],
	): Either<
		IError,
		{
			propertyEntity: IPropertyEntity;
			addressEntity: IAddressEntity;
		}
	> {
		const addressEntity = this.createAddressEntity(input);
		if (addressEntity.isLeft()) {
			return left(addressEntity.value);
		}

		const propertyEntity = this.createPropertyEntity(input, addressEntity.value.export(), amenityEntities);
		if (propertyEntity.isLeft()) {
			return left(propertyEntity.value);
		}

		return right({
			propertyEntity: propertyEntity.value.export(),
			addressEntity: addressEntity.value.export(),
		});
	}

	private getPayloadToSaveProperty(propertyEntity: IPropertyEntity): InputCreateProperty {
		return {
			id: propertyEntity.id,
			landlordId: propertyEntity.landlordId,
			description: propertyEntity.description,
			bathrooms: propertyEntity.bathrooms,
			bedrooms: propertyEntity.bedrooms,
			depth: propertyEntity.depth,
			width: propertyEntity.width,
			photosUrl: propertyEntity.photosUrl,
			price: propertyEntity.price,
			status: propertyEntity.status,
			title: propertyEntity.title,
			type: propertyEntity.type,
			address: propertyEntity.address,
			amenityIds: propertyEntity.amenities.map((amenity) => amenity.id),
		};
	}
}
