import { Schema, model } from 'mongoose';
import { Menu } from '@hackathon/types';

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  plates: [
    {
      name: { type: String },
      description: { type: String },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
});

export const MenuEntity = model<Menu>('Menu', menuSchema);
