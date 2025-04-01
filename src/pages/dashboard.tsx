import AuthWrapper from "@/components/AuthWrapper";
import D20 from "@/components/dashboard-components/D20";
import LiveSession from "@/components/dashboard-components/LiveSession";
import Session from "@/components/dashboard-components/Session";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Sessions } from "@/types";
import { Plus, Settings, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Dashboard() {
    const [sessions, setSessions] = useState<Sessions>([
        {
            name: "Dwarven Legacy",
            dm: "Aditya M.",
            thumbnail: "DL",
            banner: "/dnd-banner.jpg",
        },
        {
            name: "The Dragon's Hoard",
            dm: "Aditya M.",
            thumbnail: "DH",
            banner: "/dnd-banner2.jpg",
        },
        {
            name: "Imp & Co.",
            dm: "Aditya M.",
            thumbnail: "I",
            banner: "/dnd-banner3.jpg",
        },
        {
            name: "Barthen Wester",
            dm: "Aditya M.",
            thumbnail: "BW",
            banner: "/dnd-banner4.jpg",
        },
        {
            name: "Hood Unicorn",
            dm: "Aditya M.",
            thumbnail: "HU",
            banner: "/dnd-banner5.jpg",
        },
    ]);
    const [live, setLive] = useState("");

    return (
        <main className="flex flex-col items-center h-screen w-screen bg-neutral-100 overflow-hidden">
            {/* Navbar - Fixed at the Top */}
            <nav className="flex items-center justify-between w-full h-18 border-b border-neutral-300 px-24 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <D20 className="size-6 stroke-neutral-800 fill-neutral-800" />
                    <span className="text-xl font-semibold">Dashboard</span>
                    <div className="flex items-center gap-4 ml-4">
                        <a href="#">Characters</a>
                        <a href="#">Archives</a>
                    </div>
                </div>
                <div>
                    <Button>Sign Out</Button>
                </div>
            </nav>

            {/* Scrollable Grid Container */}
            <div className="xl:w-[70rem] md:w-[50rem] w-[30rem] p-10 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 overflow-y-auto">
                {[...sessions]
                    .sort((a, b) =>
                        a.name === live ? -1 : b.name === live ? 1 : 0
                    )
                    .map((session) =>
                        live === session.name ? (
                            <LiveSession
                                live={live}
                                setLive={setLive}
                                session={session}
                            />
                        ) : (
                            <Session
                                live={live}
                                setLive={setLive}
                                session={session}
                            />
                        )
                    )}
                <Dialog>
                    <DialogTrigger className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 hover:bg-white rounded-lg min-h-[12rem] text-neutral-500">
                        <Plus className="size-10" />
                        <span className="text-sm font-medium">
                            Create a session
                        </span>
                    </DialogTrigger>
                    <DialogContent>fuck urself</DialogContent>
                </Dialog>
            </div>
        </main>
    );
}
