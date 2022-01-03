import { Resolver } from "type-graphql";
import { User } from "../models/User";

@Resolver(() => User)
export class UserResolver {}
