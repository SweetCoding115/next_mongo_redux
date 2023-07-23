// models/index.ts
import { User } from "@/models/User";
import { getModelForClass } from "@typegoose/typegoose";

export const UserModel = getModelForClass(User);
// add other models here
