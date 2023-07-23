import { prop } from "@typegoose/typegoose";
import { nanoid } from "nanoid";

export class User {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop()
  name: string;

  @prop()
  email: string;

  @prop()
  image: string;

  @prop({ default: 'free' })
  plan: string;

  @prop({default: 1})
  accessCount: number;

  @prop()
  payedAt: Date;
  
  @prop({ default: true })
  expired: boolean;
  
  @prop({ default: () => new Date() })
  createdAt: Date;
}