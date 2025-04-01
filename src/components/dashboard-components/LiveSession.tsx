import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { SessionObject } from "@/types";
import { TextShimmer } from "../../../components/motion-primitives/text-shimmer";
import { GlowEffect } from "../../../components/motion-primitives/glow-effect";

export default function LiveSession({
    live,
    setLive,
    session,
}: {
    live: string;
    setLive: Dispatch<SetStateAction<string>>;
    session: SessionObject;
}) {
    return (
        <div
            className={cn(
                "relative flex bg-white border border-neutral-300",
                "rounded-lg shadow-lg min-h-[12rem] overflow-hidden",
                "xl:col-span-4 md:col-span-3 sm:col-span-2 col-span-1"
            )}
        >
            <div className="relative w-1/3 bg-neutral-300">
                <Image
                    src={session.banner}
                    alt={session.banner}
                    fill
                    className="object-cover animate-pulse"
                />
            </div>
            <div className="flex flex-col justify-between w-2/3">
                <div className="flex flex-col p-4">
                    <TextShimmer className="text-xl font-medium" duration={2} spread={6}>
                        {session.name}
                    </TextShimmer>
                    <span className="text-sm text-neutral-500">
                        DM: {session.dm}
                    </span>
                </div>
                <button
                    className="w-fit text-xs text-blue-700 cursor-pointer p-4"
                    onClick={() => setLive("")}
                >
                    End Live
                </button>
            </div>
        </div>
    );
}
