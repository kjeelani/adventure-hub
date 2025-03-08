import { useEffect, useRef, useState } from "react";
import { ArrowUp, LoaderCircle } from "lucide-react";
import { TextLoop } from "../../components/motion-primitives/text-loop";
import { TextShimmer } from "../../components/motion-primitives/text-shimmer";
import Background from "@/components/waitroom-components/Background";

const actions = [
    "Brewing A Sleep Potion",
    "Exchanging Books With A Little Girl",
    "Selling Diamonds To The Faye",
    "Shooting Arrows At The Dwarven",
    "Sending Magical Valentines Letters",
    "Stealing A Hag's Hair",
    "Killing That Ugly Fuck Fayd Rautha!!",
    "... Sorry I Got Heated",
    "Counting A Dragon's Hoard",
    "Threatening The Resident Bard",
];

export default function Waitroom() {
    return (
        <div className="flex items-center justify-center w-screen h-screen text-neutral-500">
            <Background />
            <div className="relative z-1 flex flex-col items-center justify-center gap-2 px-20 py-10 rounded-lg bg-white border border-neutral-300 shadow-lg">
                <span className="text-3xl font-semibold text-neutral-700">
                    Waiting Room
                </span>
                <TextLoop
                    interval={3.5}
                    className="flex w-64 items-center justify-center"
                >
                    {actions.map((action) => (
                        <TextShimmer className="text-md" duration={3}>
                            {action}
                        </TextShimmer>
                    ))}
                </TextLoop>
                <LoaderCircle className="absolute animate-spin size-4 bottom-4 right-4" />
            </div>
        </div>
    );
}
