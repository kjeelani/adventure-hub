import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { ChatLog } from "../../../types/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (req.body?.asset_id) {
      const chatlog: ChatLog | null = await prisma.chatLog.findUnique({
        where: { chat_log_id: req.body.chat_log_id },
      });
      return res.status(200).json(chatlog);
    }
    if (req.body?.session_id) {
      const chatlogs: ChatLog[] = await prisma.chatLog.findMany({
        where: { session_id: req.body.session_id },
      });
      return res.status(200).json(chatlogs);
    }
    if (req.body?.user_id) {
      const chatlogs: ChatLog[] = await prisma.chatLog.findMany({
        where: { user_id: req.body.user_id },
      });
      return res.status(200).json(chatlogs);
    }
    const chatlogs: ChatLog[] = await prisma.chatLog.findMany();
    return res.status(200).json(chatlogs);
  }

  if (req.method === "POST") {
    if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Invalid Body" });
    }
    const { chat_log_id, ...chatLogData } = req.body;
    try {
        const chatlog = await prisma.chatLog.create({ data: chatLogData });
        return res.status(201).json(chatlog);
    } catch (error) {
        return res.status(500).json({ error: "Failed to create chatlog" });
    }
  }

  if (req.method === "PUT") {
    const chatlog = await prisma.chatLog.update({
      where: { chat_log_id: req.body.chat_log_id },
      data: req.body,
    });
    return res.status(200).json(chatlog);
  }

  if (req.method === "DELETE") {
    await prisma.chatLog.delete({
      where: { chat_log_id: req.body.chat_log_id },
    });
    return res.status(204).end();
  }

  res.status(405).json({ error: "Method Not Allowed" });
}