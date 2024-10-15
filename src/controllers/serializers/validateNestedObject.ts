import { type ValidationArguments, registerDecorator } from "class-validator";
import type { AbstractSerializer } from "./abstractSerializer";

interface ValidatorErrors {
	property: string;
	constraints: Record<string, string>;
}

/**
 * Validate an object or an array of objects
 * @param propertyType property class. Should extend Validatable of \@serverless/common
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function ValidateNestedObject<T extends AbstractSerializer<O>, O>(propertyType: new (...args: any[]) => T) {
	// eslint-disable-next-line @typescript-eslint/ban-types
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	return (object: Object, propertyName: string) => {
		let errors: Record<string | number, ValidatorErrors[]> | ValidatorErrors[];

		registerDecorator({
			name: "validateNestedObject",
			target: object.constructor,
			constraints: [propertyType],
			propertyName,
			validator: {
				validate(value, args: ValidationArguments) {
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					const ClassType: new (...args: any[]) => T = args.constraints[0];

					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					function validate(value: any): ValidatorErrors[] {
						const input = new ClassType(value);
						const validationErrors = input.errors() || [];

						const formatted = validationErrors.map((error) => ({
							property: error.property,
							constraints: error.constraints as Record<string, string>,
						}));

						return formatted;
					}

					if (Array.isArray(value)) {
						errors = {};

						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						value.forEach((value: any, index: number) => {
							const validationErrors = validate(value);

							if (validationErrors.length) {
								errors[index] = validationErrors;
							}
						});
					} else {
						const validationErrors = validate(value);
						errors = validationErrors;
					}

					const isValid = !Object.keys(errors).length;
					return isValid;
				},
				defaultMessage() {
					return JSON.stringify(errors);
				},
			},
		});
	};
}
