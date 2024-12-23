import type { RentPropertyUseCase } from "@business/usecases/contactRequest/rentPropertyUseCase";
import type {
	InputRentPropertySerializer,
	OutputRentPropertySerializer,
} from "@controllers/serializers/contactRequest/rentPropertySerializer";
import { AbstractOperator } from "../abstractOperator";

export class RentPropertyOperator extends AbstractOperator<InputRentPropertySerializer, OutputRentPropertySerializer> {
	constructor(private readonly rentPropertyUseCase: RentPropertyUseCase) {
		super();
	}

	protected async run(input: InputRentPropertySerializer): Promise<OutputRentPropertySerializer> {
		return await this.rentPropertyUseCase.exec(input);
	}
}
