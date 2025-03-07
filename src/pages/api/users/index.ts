import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { User } from "../../../types/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { user_id } = req.query;
    console.log(user_id)
    if (user_id) {
      const user: User | null = await prisma.user.findUnique({
        where: { user_id: user_id as string},
      });
      return res.status(200).json(user);
    }
    const users: User[] = await prisma.user.findMany();
    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Invalid Body" });
    }
    try {
      const user = await prisma.user.create({ data: req.body });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create user" });
    }
  }

  if (req.method === "PUT") {
    const user = await prisma.user.update({
      where: { user_id: req.body.user_id },
      data: req.body,
    });
    return res.status(200).json(user);
  }

  if (req.method === "DELETE") {
    await prisma.user.delete({
      where: { user_id: req.body.user_id },
    });
    return res.status(204).end();
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
