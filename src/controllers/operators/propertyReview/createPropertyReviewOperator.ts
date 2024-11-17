import type {
	InputCreatePropertyReviewSerializer,
	OutputCreatePropertyReviewSerializer,
} from "@controllers/serializers/propertyReview/createPropertyReviewSerializer";
import { AbstractOperator } from "../abstractOperator";
import type { CreatePropertyReviewUseCase } from "@business/usecases/propertyReview/createPropertyReviewUseCase";

export class CreatePropertyReviewOperator extends AbstractOperator<
	InputCreatePropertyReviewSerializer,
	OutputCreatePropertyReviewSerializer
> {
	constructor(private readonly createPropertyReviewUseCase: CreatePropertyReviewUseCase) {
		super();
	}

	protected async run(input: InputCreatePropertyReviewSerializer): Promise<OutputCreatePropertyReviewSerializer> {
		return this.createPropertyReviewUseCase.exec(input);
	}
}
