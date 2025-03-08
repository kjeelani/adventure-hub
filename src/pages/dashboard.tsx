import AuthWrapper from "@/components/AuthWrapper";
import D20 from "@/components/dashboard-components/D20";
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
import { Archive, Plus, Settings, Trash2 } from "lucide-react";
import Image from "next/image";

const sessions = [
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
];

export default function Dashboard() {
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
                {sessions.map((session) => (
                    <div className="flex flex-col bg-white border border-neutral-300 rounded-lg shadow-lg min-h-[12rem] overflow-hidden">
                        <div className="relative h-1/3 border-b bg-neutral-300">
                            <Image
                                src={session.banner}
                                alt={session.banner}
                                fill
                                className="object-cover opacity-70"
                            />
                            <div className="absolute flex items-center justify-center border-4 border-white bg-neutral-500 size-14 rounded-full top-9 right-6 text-white">
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
                        <div className="flex items-center justify-end h-1/6 px-4">
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
                                    <DropdownMenuLabel>
                                        {session.name}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Archive />
                                            Archive
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings />
                                            Settings
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-500 [&>svg]:stroke-red-500 focus:bg-red-400 focus:text-white focus:[&>svg]:stroke-white">
                                        <Trash2 className="" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ))}
                <Dialog>
                    <DialogTrigger className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 hover:bg-white rounded-lg min-h-[12rem] text-neutral-500">
                        <Plus className="size-10" />
                        <span className="text-sm font-medium">
                            Create a session
                        </span>
                    </DialogTrigger>
                    <DialogContent>
                        fuck urself
                    </DialogContent>
                </Dialog>
            </div>
        </main>
    );
}
