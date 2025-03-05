import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { AssetClass } from "../../../types/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (req.body?.asset_class_id) {
      const assetClass: AssetClass | null = await prisma.assetClass.findUnique({
        where: { asset_class_id: req.body.asset_class_id },
      });
      return res.status(200).json(assetClass);
    }
    const assetClasses: AssetClass[] = await prisma.assetClass.findMany();
    return res.status(200).json(assetClasses);
  }

  if (req.method === "POST") {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Invalid Body" });
    }
    const { asset_class_id, ...assetClassData } = req.body;
    try {
      const assetClass = await prisma.assetClass.create({ data: assetClassData });
      return res.status(201).json(assetClass);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create asset_class" });
    }
  }

  if (req.method === "PUT") {
    const assetClass = await prisma.assetClass.update({
      where: { asset_class_id: req.body.asset_class_id },
      data: req.body,
    });
    return res.status(200).json(assetClass);
  }

  if (req.method === "DELETE") {
    await prisma.assetClass.delete({
      where: { asset_class_id: req.body.asset_class_id },
    });
    return res.status(204).end();
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
