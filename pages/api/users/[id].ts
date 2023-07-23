// pages/api/users/[id].ts
import { UserModel } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";
type UpdateUserBody = Partial<User>;

interface CreateUserBody {
  _id: string;
  name: string;
  email: string;
  image: string;
  plan: string;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // first connect to the database
  await dbConnect();
  const email = req.query.id as string;
  console.log(email)
  if (req.method === "POST") {
    // for retrieving a single user
    const user = await UserModel.findOne({email: email});
    if (user) {
      user.set({...user, accessCount: user.accessCount + 1})
      await user.save();
      res.status(200).json(user);
    } else {
      const body = req.body as CreateUserBody;
      const user = new UserModel({
        // googleId: body.id,
        name: body.name,
        email: body.email,
        image: body.image,
        // plan: body.plan,
      });
      await user.save();

      res.status(200).json(user.toJSON());
    }
  } else if (req.method === "PUT") {
    // updating a single user
    const body = req.body as UpdateUserBody;
    const user = await UserModel.findOne({email: email});
    if (user) {
      user.set({ ...body });
      await user.save();
      res.status(200).json(user.toJSON());
    } else {
      res.status(404);
    }
  } else if (req.method === "DELETE") {
    // deleting a single user
    const user = await UserModel.findOneAndRemove({email: email});
    if (user) {
      res.status(200).json(user.toJSON());
    } else {
      res.status(404);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
