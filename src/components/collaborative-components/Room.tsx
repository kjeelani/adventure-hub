"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveObject } from "@liveblocks/client";

export function Room({ children }: { children: ReactNode }) {
    return (
        <LiveblocksProvider
            publicApiKey={
                "pk_dev_7jdOs6km1VwSbmJR2Wzggc3s5bCrUvmlKOU6Jn7NW7IywYN4ib7EdflfAmlWQTWn"
            }
            throttle={16}
        >
            <RoomProvider
                id="test-room"
                initialPresence={{ cursor: null }}
                initialStorage={{
                    board: new LiveObject({
                        x: 0,
                        y: 0,
                        zoom: 0.5,
                        user: null
                    }),
                }}
            >
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}
