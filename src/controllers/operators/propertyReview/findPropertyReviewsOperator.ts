import type {
	InputFindPropertyReviewsSerializer,
	OutputFindPropertyReviewsSerializer,
} from "@controllers/serializers/propertyReview/findPropertyReviewsSerializer";
import { AbstractOperator } from "../abstractOperator";
import type { FindPropertyReviewsUseCase } from "@business/usecases/propertyReview/findPropertyReviewsUseCase";

export class FindPropertyReviewsOperator extends AbstractOperator<
	InputFindPropertyReviewsSerializer,
	OutputFindPropertyReviewsSerializer
> {
	constructor(private readonly findPropertyReviewsUseCase: FindPropertyReviewsUseCase) {
		super();
	}

	protected async run(input: InputFindPropertyReviewsSerializer): Promise<OutputFindPropertyReviewsSerializer> {
		return this.findPropertyReviewsUseCase.exec(input);
	}
}