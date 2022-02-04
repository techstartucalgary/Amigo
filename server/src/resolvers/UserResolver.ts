import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User, UserModel } from "../models/User";
import {
	UpdateUserType,
	RegisterUserType,
	UserResponse,
} from "../types/UserTypes";
import { validateRegister, validateUpdate } from "../utils/validate";

@Resolver(() => User)
export class UserResolver {
	@Query(() => String)
	hello() {
		return "Hello world!";
	}

	@Query(() => [User])
	getUser() {
		return UserModel.aggregate().sample(15);
	}

	@Mutation(() => UserResponse, { description: "Register a user" })
	async register(@Arg("data") data: RegisterUserType) {
		const errors = validateRegister(data);
		if (errors) return { errors };
		try {
			const user = await UserModel.create(data);
			return { user };
		} catch (error) {
			const field = Object.keys(error.keyValue)[0];
			return {
				errors: [
					{
						field,
						message: `Duplicate ${field}, try with a different one!`,
					},
				],
			};
		}
	}
	@Mutation(() => UserResponse, {
		description: "Updates user.",
	})
	async updateUser(@Arg("data", () => UpdateUserType) data: UpdateUserType) {
		const errors = validateUpdate(data);
		if (errors) return { errors };
		const user = await UserModel.findByIdAndUpdate(data.id, data, {
			new: true,
		});
		return user;
    }

	@Mutation(() => Boolean, {
        description: "Deletes user.",
    })
    async deleteUser(
        @Arg("id") data: String) {
        await UserModel.findByIdAndDelete(data);
		return true;
    }
}
