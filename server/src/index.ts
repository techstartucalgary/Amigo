import "reflect-metadata";
import "dotenv-safe/config";
import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema, Query, Resolver } from "type-graphql";

@Resolver()
class HelloResolver {
	@Query(() => String)
	hello() {
		return "Hello World!";
	}
	@Query(() => String)
	hi() {
		return "hi!";
	}
}

const main = async () => {
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
	app.listen(Number(port), () =>
		console.log(`🚀 Listening on https://localhost:${port}!`)
	);
};

main();
