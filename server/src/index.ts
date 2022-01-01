import "reflect-metadata";
import { mongoose } from "@typegoose/typegoose";
import { ConnectOptions } from "mongoose";
import "dotenv-safe/config";
import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
	Arg,
	buildSchema,
	Field,
	Mutation,
	ObjectType,
	Query,
	Resolver,
} from "type-graphql";

@ObjectType()
class UserType {
	@Field(() => String)
	name: string;
	@Field(() => String)
	major: string;
}

const users = [
	{ name: "nurgul", major: "eng" },
	{ name: "eugene", major: "eng" },
	{ name: "zeyad", major: "cs" },
];

@Resolver()
class HelloResolver {
	@Query(() => String)
	hello() {
		return "Hello World!";
	}
	@Query(() => [UserType])
	users() {
		return users;
	}
	@Query(() => [UserType])
	user(@Arg("major") major: String) {
		const getUsers = [];
		for (const user of users) {
			if (user.major === major) getUsers.push(user);
		}
		return getUsers;
	}
	@Mutation(() => UserType)
	AddUser(@Arg("major") major: string, @Arg("name") name: string) {
		users.push({ name, major });
		return { name, major };
	}
}

const main = async () => {
	// Connecting to MongoDB
	await mongoose
		.connect(process.env.MONGO_URL!, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		} as ConnectOptions)
		.then(() => console.log("🚀 DB successfully connected!"));

	// Creating instance of express server
	const app = express();

	app.set("trust proxy", 1);
	app.use(cors());

	// Creating instance of Apollo Server
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({
			req,
			res,
		}),
	});

	// Applying app as middleware to Apollo Server
	apolloServer.applyMiddleware({
		app,
		cors: false,
	});

	// Start Server
	const port = process.env.PORT;
	app.listen(Number(port), () => console.log(`🚀 Listening on port ${port}!`));
};

main();
