import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Asset } from "../../../types/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (req.body?.asset_id) {
      const asset: Asset | null = await prisma.asset.findUnique({
        where: { asset_id: req.body.asset_id },
      });
      return res.status(200).json(asset);
    }
    if (req.body?.asset_class_id) {
      const assets: Asset[] = await prisma.asset.findMany({
        where: { asset_class_id: req.body.asset_class_id },
      });
      return res.status(200).json(assets);
    }
    if (req.body?.session_id) {
      const assets: Asset[] = await prisma.asset.findMany({
        where: { session_id: req.body.session_id },
      });
      return res.status(200).json(assets);
    }
    const assets: Asset[] = await prisma.asset.findMany();
    return res.status(200).json(assets);
  }

  if (req.method === "POST") {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Invalid Body" });
    }
    const { asset_id, ...assetData } = req.body;
    try {
        const asset = await prisma.asset.create({ data: assetData });
        return res.status(201).json(asset);
    } catch (error) {
        return res.status(500).json({ error: "Failed to create asset" });
    }
  }

  if (req.method === "PUT") {
    const asset = await prisma.asset.update({
      where: { asset_id: req.body.asset_id },
      data: req.body,
    });
    return res.status(200).json(asset);
  }

  if (req.method === "DELETE") {
    await prisma.asset.delete({
      where: { asset_id: req.body.asset_id },
    });
    return res.status(204).end();
  }

  res.status(405).json({ error: "Method Not Allowed" });
}