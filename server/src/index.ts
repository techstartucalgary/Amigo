import { mongoose } from "@typegoose/typegoose";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";

const main = async () => {
	// Connecting to MongoDB
	await mongoose
		.connect(process.env.MONGO_URL!, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		})
		.then(() => console.log("🚀 DB successfully connected!"))
		.catch((err) => console.error(err));

	// Creating instance of express server
	const app = express();

	app.set("trust proxy", 1);
	app.use(cors());

	// Creating instance of Apollo Server
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver],
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
