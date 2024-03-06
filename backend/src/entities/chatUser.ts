import {model, Schema} from "mongoose";
import {ChatUser} from "@hackathon/types";

const chatUserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        chatId: {
            type: Number,
            required: true,
        },
    }
);

export const ChatUserEntity  = model<ChatUser>('ChatUser', chatUserSchema);


