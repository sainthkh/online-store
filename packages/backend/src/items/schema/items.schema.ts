import { Schema } from 'mongoose';

export const ItemSchema: Schema = new Schema({
  id: String,
  name: String,
  description: String,
  image: String,
  largeImage: String,
  price: Number,
});
