import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "../models/User";
import { FieldError } from "./FieldError";

@ObjectType({ description: "The response from the user resolver" })
export class UserResponse {
	@Field(() => [FieldError], {
		nullable: true,
		description: "The errors caught.",
	})
	errors?: FieldError[];

	@Field(() => User, {
		nullable: true,
		description: "The user that was returned.",
	})
	user?: User;
}

@InputType()
export class RegisterUserType {

	@Field(() => String, { description: "The user's first name." })
	firstName: string;

	@Field(() => String, { description: "The user's last name." })
	lastName: string;

	@Field(() => String, { description: "The user's bio." })
	bio: string;

	@Field(() => String, { description: "The user's university." })
	university: string;

	@Field(() => String, { description: "The user's email." })
	email: string;

	@Field(() => String)
	password: string;

	@Field(() => Date, { description: "The user's date of birth." })
	dateOfBirth: Date;

	@Field(() => String, { description: "The user's questionnaire answers." })
	questionnaire: string;

	@Field(() => [String], { description: "The user's hobbies." })
	hobbies: string[];

	@Field(() => [String], { description: "The user's courses." })
	courses: string[];
}

@InputType()
export class UpdateUserType {
	@Field(() => String, { description: "The user's id" })
	id: string;

	@Field(() => String, { nullable: true, description: "The user's bio." })
	bio?: string;

	@Field(() => String, { nullable: true, description: "The user's university." })
	university?: string;

	@Field(() => String, { nullable: true, description: "The user's questionnaire answers." })
	questionnaire?: string;

	@Field(() => [String], { nullable: true, description: "The user's hobbies." })
	hobbies?: string[];

	@Field(() => [String], { nullable: true, description: "The user's courses." })
	courses?: string[];
}
