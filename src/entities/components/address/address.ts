import {
	InvalidAddressNumber,
	InvalidCoordinates,
} from "@entities/errors/address";
import { AbstractEntity } from "@entities/shared/abstractEntity";
import type { IBaseModel } from "@entities/shared/baseModel";
import { left, right, type Either } from "@shared/either";
import type { IError } from "@shared/error";

export interface IAddressEntity extends IBaseModel {
	number: number;
	street: string;
	lat: string;
	lon: string;
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

	private static validateCoordinates(lat: string, lon: string): boolean {
		const latRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
		const lonRegex = /^[-+]?((1[0-7]\d|[1-9]?\d)(\.\d+)?|180(\.0+)?)$/;

		return latRegex.test(lat) && lonRegex.test(lon);
	}

	get number(): number {
		return this.props.number;
	}

	get street(): string {
		return this.props.street;
	}

	get lat(): string {
		return this.props.lat;
	}

	get lon(): string {
		return this.props.lon;
	}
}
