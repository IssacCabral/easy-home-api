import type { InputCreatePropertyDto, OutputCreatePropertyDtyo } from "@business/dtos/property/createPropertyDto";
import { CoordinatesNotAvailable, CreatePropertyGeneralError, LandlordNotFound } from "@business/errors/property";
import type { IAddressRepository } from "@business/repositories/iAddressRepository";
import type { ILandlordRepository } from "@business/repositories/iLandlordRepository";
import type { IPropertyRepository, InputCreateProperty } from "@business/repositories/iPropertyRepository";
import type { IUniqueIdentifierService } from "@business/services/iUniqueIdentifierService";
import type { IUseCase } from "@business/shared/iUseCase";
import { AddressEntity, type IAddressEntity } from "@entities/components/address/address";
import { type IPropertyEntity, PropertyEntity, PropertyStatus } from "@entities/components/property/property";
import { type Either, left, right } from "@shared/either";
import type { IError } from "@shared/error";

export class CreatePropertyUseCase implements IUseCase<InputCreatePropertyDto, OutputCreatePropertyDtyo> {
	constructor(
		private readonly landlordRepository: ILandlordRepository,
		private readonly propertyRepository: IPropertyRepository,
		private readonly addressRepository: IAddressRepository,
		private readonly uniqueIdentifierService: IUniqueIdentifierService,
	) {}

	async exec(input: InputCreatePropertyDto): Promise<OutputCreatePropertyDtyo> {
		try {
			const { lat, lon } = input.address;
			const [landlord, address] = await Promise.all([
				this.landlordRepository.findById(input.landlordId),
				this.addressRepository.findByCoordinates(lat, lon),
			]);

			if (!landlord) {
				return left(LandlordNotFound);
			}

			if (address) {
				return left(CoordinatesNotAvailable);
			}

			const createdEntities = this.createEntities(input);
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
			number: address.number,
			street: address.street,
		});
	}

	private createPropertyEntity(
		input: InputCreatePropertyDto,
		addressEntity: IAddressEntity,
	): Either<IError, PropertyEntity> {
		return PropertyEntity.create({
			id: this.uniqueIdentifierService.create(),
			bathrooms: input.bathrooms,
			bedrooms: input.bedrooms,
			height: input.height,
			width: input.width,
			landlordId: input.landlordId,
			price: input.price,
			title: input.title,
			description: input.description,
			status: PropertyStatus.FREE,
			type: input.type,
			photosUrl: input.photosUrl,
			address: addressEntity,
		});
	}

	private createEntities(input: InputCreatePropertyDto): Either<
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

		const propertyEntity = this.createPropertyEntity(input, addressEntity.value.export());
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
			landlordId: propertyEntity.landlordId,
			addressId: propertyEntity.address.id,
			bathrooms: propertyEntity.bathrooms,
			bedrooms: propertyEntity.bedrooms,
			height: propertyEntity.height,
			width: propertyEntity.width,
			photosUrl: propertyEntity.photosUrl,
			price: propertyEntity.price,
			status: propertyEntity.status,
			title: propertyEntity.title,
			type: propertyEntity.type,
		};
	}
}
