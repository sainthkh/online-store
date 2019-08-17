import { Document } from 'mongoose';

export interface IItem extends Document {
  id: string;
  name: string;
  description: string;
  image: string;
  largeImage: string;
  price: number;
}
