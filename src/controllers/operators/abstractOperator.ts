import { validationError } from "@controllers/protocols/validationError";
import type { AbstractSerializer } from "@controllers/serializers/abstractSerializer";
import { ValidationError } from "class-validator";

export abstract class AbstractOperator<I, O> {
	protected abstract run(input?: AbstractSerializer<I>): Promise<O>;

	public async exec(input?: AbstractSerializer<I>): Promise<O> {
		try {
			if (input) {
				input.validate();
			}
			return this.run(input);
		} catch (err) {
			if (Array.isArray(err) && err.length && err[0] instanceof ValidationError) {
				const data = err.map((i) => ({
					property: i.property,
					constraints: i.constraints,
				}));
				throw validationError(data);
			}
			throw err;
		}
	}
}
