import { InvalidAddressNumber, InvalidCoordinates } from "@entities/errors/address";
import { AbstractEntity } from "@entities/shared/abstractEntity";
import type { IBaseModel } from "@entities/shared/baseModel";
import { type Either, left, right } from "@shared/either";
import type { IError } from "@shared/iError";

export interface IAddressEntity extends IBaseModel {
	number: number;
	street: string;
	lat: number;
	lon: number;
}

export class AddressEntity extends AbstractEntity<IAddressEntity> {
	static create(props: IAddressEntity): Either<IError, AddressEntity> {
		if (!AddressEntity.validateCoordinates(props.lat, props.lon)) {
			return left(InvalidCoordinates);
		}

		if (props.number < 0) {
			return left(InvalidAddressNumber);
		}

		const address = new AddressEntity(props);

		return right(address);
	}

	private static validateCoordinates(lat: number, lon: number): boolean {
		const latRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
		const lonRegex = /^[-+]?((1[0-7]\d|[1-9]?\d)(\.\d+)?|180(\.0+)?)$/;

		return latRegex.test(lat.toString()) && lonRegex.test(lon.toString());
	}

	get id(): string {
		return this.props.id;
	}

	get number(): number {
		return this.props.number;
	}

	get street(): string {
		return this.props.street;
	}

	get lat(): number {
		return this.props.lat;
	}

	get lon(): number {
		return this.props.lon;
	}
}
