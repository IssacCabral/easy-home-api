import type {
	InputCreateLandlordSerializer,
	OutputCreateLandlordSerializer,
} from "@controllers/serializers/landlord/createLandlordSerializer";
import { AbstractOperator } from "../abstractOperator";
import type { OutputCreateLandlordDto } from "@business/dtos/landlord/createLandlordDto";
import type { CreateLandlordUseCase } from "@business/usecases/landlord/createLandlordUseCase";

export class CreateLandlordOperator extends AbstractOperator<
	InputCreateLandlordSerializer,
	OutputCreateLandlordSerializer
> {
	constructor(private readonly createLandlordUseCase: CreateLandlordUseCase) {
		super();
	}

	protected async run(input: InputCreateLandlordSerializer): Promise<OutputCreateLandlordDto> {
		return await this.createLandlordUseCase.exec(input);
	}
}
