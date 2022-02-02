import {
	getModelForClass,
	ModelOptions,
	Pre,
	Prop,
} from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
@ObjectType({ description: "The User Model." })
@Pre<User>("save", async function () {
	/* Only run if password was modified */
	if (!this.isModified("password")) return;
	/* Hash the password with cost of 12 */
	this.password = await bcrypt.hash(this.password, 12);
})
@ModelOptions({ options: { allowMixed: 0 } })
export class User {
	@Field(() => ID, { description: "The user's ID. " })
	id: string;

	@Field(() => String, { description: "The user's first name." })
	@Prop({ required: true })
	firstName: string;

	@Field(() => String, { description: "The user's last name." })
	@Prop({ required: true })
	lastName: string;

	@Field(() => String, { description: "The user's bio." })
	@Prop({ required: true })
	bio: string;

	@Field(() => [String], {
		description: "URLs to the user's pictures,",
		nullable: true,
	})
	@Prop()
	pictures?: Types.Array<string>;

	@Field(() => String, { description: "The user's university." })
	@Prop({ required: true })
	university: string;

	@Field(() => String, { description: "The user's email." })
	@Prop({ required: true, unique: true, index: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({ default: new Date() })
	lastPasswordReset?: Date;

	@Prop()
	passwordResetCode?: string;

	@Field(() => Date, {
		nullable: true,
		description: "The user's date of birth.",
	})
	@Prop()
	dateOfBirth?: Date;

	@Field(() => [User], {
		nullable: true,
		description: "Users this user has liked.",
	})
	@Prop({ default: [] })
	liked?: Types.Array<User>;

	@Field(() => [User], {
		nullable: true,
		description: "Users this user has matched with.",
	})
	@Prop({ default: [] })
	matches?: Types.Array<User>;

	@Field(() => String, { description: "The user's questionnaire answers." })
	@Prop({ required: true, index: true })
	questionnaire: string;

	@Field(() => [String], { description: "The user's hobbies." })
	@Prop({ required: true, index: true })
	hobbies: Types.Array<string>;

	@Field(() => [String], { description: "The user's courses." })
	@Prop({ required: true, index: true })
	courses: Types.Array<string>;

	// @Field(() => [Chat], {
	// 	nullable: true,
	// 	description: "The user's chat history.",
	// })
	// @Prop({ required: true, index: true })
	// chats: Types.Array<string>;

	@Field(() => Boolean, { description: "The user's verified status" })
	@Prop({ default: false })
	verified: boolean;

	// @Field(() => [Activity], {
	// 	nullable: true,
	// 	description: "The user's activity log.",
	// })
	// @Prop({ required: true })
	// log: Types.Array<Activity>;

	@Field(() => Number, { description: "The user's account status" })
	@Prop({ default: 1, index: true })
	accountStatus: number;
}

export const UserModel = getModelForClass(User);
