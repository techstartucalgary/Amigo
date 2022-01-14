import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User, UserModel } from "../models/User";
import { UpdateUserType, RegisterUserType, UserResponse } from "../types/UserTypes";

@Resolver(() => User)
export class UserResolver {
	@Query(() => String)
	hello() {
		return "Hello world!";
	}

	@Mutation(() => UserResponse, { description: "Register a user" })
	register(@Arg("data") data: RegisterUserType) {
		/**
		 * TODO: Validate the data
		 */

		try {
			return UserModel.create(data);
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
    async updateUser(
        @Arg("data", () => UpdateUserType) data: UpdateUserType
    ) {
        return UserModel.findByIdAndUpdate(data.id, data, { new: true });
    }
}

