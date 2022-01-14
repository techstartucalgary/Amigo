import { getModelForClass, Prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType({ description: "MessageModel" })
class Message {
	@Field(() => User, { description: "SenderOfChat" })
	@Prop({ required: true })
	from: User;

	@Field(() => String, { description: "ContentOfMessage" })
	@Prop({ required: true })
	content: String;

	@Field(() => Date, { description: "TimeWhenMessageReceived" })
	@Prop({ default: new Date() })
	timestamp: Date;
}

@ObjectType({ description: "ChatModel" })
class Chat {
	@Field(() => ID)
	@Prop({ required: true })
	id: string;

	@Field(() => User, { description: "ReceiverOfChat" })
	@Prop({ required: true })
	receiver: User;

	@Field(() => User, { description: "SenderOfChat" })
	@Prop({ required: true })
	sender: User;

	@Field(() => [Message], { description: "UserMessage" })
	@Prop({ required: true })
	messages: Types.Array<Message>;
}

export const MessageModel = getModelForClass(Message);
export const ChatModel = getModelForClass(Chat);
