import { Document } from 'mongoose';

export interface Plate {
  name: string;
  description: string;
}

export interface Menu extends Document {
  name: string;
  plates: Plate[];
  price: number;
}

export interface Order extends Document {
  chatUser: string;
  menu: string;
  completed: boolean;
}

export interface PopulatedOrder extends Omit<Omit<Order, 'menu'>, 'chatUser'> {
  menu: Menu;
  chatUser: ChatUser;
  completed: boolean;
}

export interface ChatUser extends Document {
  name: string;
  chatId: number;
}
