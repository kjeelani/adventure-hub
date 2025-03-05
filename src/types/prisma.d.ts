import { Prisma } from "@prisma/client";

export type User = Prisma.UserGetPayload<{}>;
export type Session = Prisma.SessionGetPayload<{}>;
export type ChatLog = Prisma.ChatLogGetPayload<{}>;
export type Asset = Prisma.AssetGetPayload<{}>;
export type AssetClass = Prisma.AssetClassGetPayload<{}>;

// Part of ChatLog
export type Roll = {
    dicetype: "4" | "6" | "8" | "10" | "20" | "100";
    roll: number;
};

export type BattleGridAsset = {
    asset_id: number,
    x: float,
    y: float
}

// BattleGrid contains state of current grid, contained in Session
export type BattleGrid = {
    width: number;
    height: number;
    assets: BattleGridAsset[]
};

