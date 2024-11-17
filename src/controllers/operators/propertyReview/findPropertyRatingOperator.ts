import type {
	InputFindPropertyRatingSerializer,
	OutputFindPropertyRatingSerializer,
} from "@controllers/serializers/propertyReview/findPropertyRatingSerializer";
import { AbstractOperator } from "../abstractOperator";
import type { OutputFindPropertyRatingDto } from "@business/dtos/propertyReview/findPropertyRatingDto";
import type { FindPropertyRatingUseCase } from "@business/usecases/propertyReview/findPropertyRatingUseCase";

export class FindPropertyRatingOperator extends AbstractOperator<
	InputFindPropertyRatingSerializer,
	OutputFindPropertyRatingSerializer
> {
	constructor(private readonly findPropertyRatingUseCase: FindPropertyRatingUseCase) {
		super();
	}

	protected async run(input: InputFindPropertyRatingSerializer): Promise<OutputFindPropertyRatingDto> {
		return this.findPropertyRatingUseCase.exec(input);
	}
}
