import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "Field Error Model" })
export class FieldError {
	@Field(() => String, { description: "The field the error occurred on." })
	field: string;

	@Field(() => String, { description: "The error message." })
	message: string;
}
