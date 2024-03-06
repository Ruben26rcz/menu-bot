import {model, Schema} from "mongoose";
import {Order} from "@hackathon/types";


const orderSchema = new Schema(
    {
        chatUser: {
            type: Schema.Types.ObjectId,
            ref: 'ChatUser'
        },
        menu: {
            type: Schema.Types.ObjectId,
            ref: 'Menu'
        },
        completed: {
            type: Boolean,
            default: false,
        }

    }
);

export const OrderEntity  = model<Order>('Order', orderSchema);


