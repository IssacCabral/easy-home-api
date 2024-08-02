import { InvalidLabel } from "@entities/errors/amenity";
import { AbstractEntity } from "@entities/shared/abstractEntity";
import type { IBaseModel } from "@entities/shared/baseModel";
import { type Either, left, right } from "@shared/either";
import type { IError } from "@shared/error";

export interface IAmenityEntity extends IBaseModel {
	label: string;
}

export class AmenityEntity extends AbstractEntity<IAmenityEntity> {
	private static readonly LABEL_WORDS = 1;

	static create(props: IAmenityEntity): Either<IError, AmenityEntity> {
		if (!AmenityEntity.validateLabel(props.label)) {
			return left(InvalidLabel);
		}

		const amenity = new AmenityEntity(props);

		return right(amenity);
	}

	private static validateLabel(label: string): boolean {
		return label.trim().split(/\s+/).length === AmenityEntity.LABEL_WORDS;
	}

	get label(): string {
		return this.export().label;
	}
}
