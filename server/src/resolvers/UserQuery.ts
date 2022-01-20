import { User, UserModel } from "../models/User";
import { RegisterUserType, UserResponse } from "../types/UserTypes";
import {
	Arg,
	buildSchema,
	Field,
	Mutation,
	ObjectType,
	Query,
	Resolver,
} from "type-graphql";

@Resolver()
class UserQuery {
	@Query(() => [User])
	users() {
		return users.slice(0, 15);
	}
	@Query(() => [User])
	user(@Arg("firstName") firstName: String) {
		const firstNames = [];
		for (const user of users) {
			if (user.firstName === firstName) {
				firstNames.push(user);
			}
		}
		return firstNames;
	}
}