import { Document } from 'mongoose';

export interface Plate {
  _id: React.Key;
  name: string;
  description: string;
}

export interface Menu extends Document {
  _id: React.Key;
  name: string;
  plates: Plate[];
  price: number;
}

export interface Order extends Document {
  _id: React.Key;
  chatUser: ChatUser;
  menu: Menu;
  completed: boolean;
}
export interface ChatUser extends Document {
  name: string;
  chatId: number;
}
