// pages/api/users/index.ts
import { UserModel } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
interface CreateUserBody {
  id: string;
  name: string;
  email: string;
  image: string;
  plan: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "GET") {
    // for retrieving users list
    const users = await UserModel.find({}).limit(10).lean();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    // creating a single user
    const body = req.body as CreateUserBody;
    const user = new UserModel({
      googleId: body.id,
      name: body.name,
      email: body.email,
      image: body.image,
      plan: body.plan,
    });
    await user.save();

    res.status(200).json(user.toJSON());
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
