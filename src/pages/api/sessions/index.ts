import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Session } from "../../../types/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (req.body?.session_id) {
      const session: Session | null = await prisma.session.findUnique({
        where: { session_id: req.body.session_id },
      });
      return res.status(200).json(session);
    }
    const sessions: Session[] = await prisma.session.findMany();
    return res.status(200).json(sessions);
  }

  if (req.method === "POST") {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Invalid Body" });
    }
    const { session_id, ...sessionData } = req.body;
    try {
      const session = await prisma.session.create({ data: sessionData });
      return res.status(201).json(session);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create session" });
    }
  }

  if (req.method === "PUT") {
    const session = await prisma.session.update({
      where: { session_id: req.body.session_id },
      data: req.body,
    });
    return res.status(200).json(session);
  }

  if (req.method === "DELETE") {
    await prisma.session.delete({
      where: { session_id: req.body.session_id },
    });
    return res.status(204).end();
  }

  res.status(405).json({ error: "Method Not Allowed" });
}