import type { CreateLandlordUseCase } from "@business/usecases/landlord/createLandlordUseCase";
import type {
	InputCreateLandlordSerializer,
	OutputCreateLandlordSerializer,
} from "@controllers/serializers/landlord/createLandlordSerializer";
import { AbstractOperator } from "../abstractOperator";

export class CreateLandlordOperator extends AbstractOperator<
	InputCreateLandlordSerializer,
	OutputCreateLandlordSerializer
> {
	constructor(private readonly createLandlordUseCase: CreateLandlordUseCase) {
		super();
	}

	protected async run(input: InputCreateLandlordSerializer): Promise<OutputCreateLandlordSerializer> {
		return await this.createLandlordUseCase.exec(input);
	}
}
