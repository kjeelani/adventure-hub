import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { SessionObject } from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Settings, Trash2 } from "lucide-react";

export default function Session({
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
                "flex flex-col bg-white border border-neutral-300 rounded-lg shadow-lg min-h-[12rem] overflow-hidden",
                {
                    "xl:col-span-4 md:col-span-3 sm:col-span-2 col-span-1":
                        live === session.name,
                }
            )}
        >
            <div className="relative h-1/3 border-b bg-neutral-300">
                <Image
                    src={session.banner}
                    alt={session.banner}
                    fill
                    className="object-cover opacity-70"
                />
                <div
                    className={cn(
                        "absolute flex items-center justify-center border-4",
                        "border-white bg-neutral-500 size-14 rounded-full",
                        "top-9 right-6 text-white"
                    )}
                >
                    {session.thumbnail}
                </div>
            </div>
            <div className="flex flex-col h-1/2">
                <div className="flex flex-col px-4 py-2">
                    <span className="text-md font-medium text-neutral-800">
                        {session.name}
                    </span>
                    <span className="text-xs text-neutral-500">
                        DM: {session.dm}
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-between h-1/6 px-4">
                <button
                    className="text-xs text-blue-700 cursor-pointer"
                    onClick={() => setLive(session.name)}
                >
                    Go Live
                </button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="text-xs text-blue-700 cursor-pointer">
                            Edit
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side="top"
                        sideOffset={10}
                        className="min-w-[10rem]"
                    >
                        <DropdownMenuLabel>{session.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Settings />
                                Settings
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuItem
                            className={cn(
                                "text-red-500 [&>svg]:stroke-red-500 focus:bg-red-400",
                                "focus:text-white focus:[&>svg]:stroke-white"
                            )}
                        >
                            <Trash2 className="" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
