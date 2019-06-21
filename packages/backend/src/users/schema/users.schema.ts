import { Schema } from 'mongoose';

export const UserSchema: Schema = new Schema({
  id: String,
  name: String,
  email: String,
});
