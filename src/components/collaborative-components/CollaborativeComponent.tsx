import {
    useOthers,
    useUpdateMyPresence,
    useStorage,
    useMutation,
} from "@liveblocks/react/suspense";
import { MousePointer2 } from "lucide-react";
import { useEffect, useRef } from "react";
//import PanZoom, { API, Element } from "@sasza/react-panzoom";
import PanZoom, { Element } from "./TestPanZoom";
import { SignOutButton, useAuth } from "@clerk/nextjs";

export default function CollaborativeComponent() {
    //const panZoomRef = useRef<API>(null);
    const others = useOthers();
    const updateMyPresence = useUpdateMyPresence();
    const { userId } = useAuth();
    const board = useStorage((root) => root.board);

    const updateBoardPosition = useMutation(({ storage }, key, value) => {
        const mutableBoard = storage.get("board");
        console.log(key, value);
        mutableBoard.set(key, value);
        mutableBoard.set("user", userId as string);
    }, []);

    // useEffect(() => {
    //     if (!panZoomRef.current) return;

    //     if (board.user !== userId) {
    //         panZoomRef.current.setPosition(board.x, board.y);
    //     }
    // }, [board]);

    return (
        <main
            className="flex items-center justify-center h-screen w-screen"
            onPointerMove={(e) =>
                updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
            }
            onPointerLeave={() => updateMyPresence({ cursor: null })}
        >
            <SignOutButton />
            {others.map(({ connectionId, presence }) =>
                presence.cursor ? (
                    <div
                        key={connectionId}
                        className="absolute"
                        style={{
                            top: presence.cursor.y,
                            left: presence.cursor.x,
                        }}
                    >
                        <MousePointer2 />
                    </div>
                ) : null
            )}
            <div className="relative border w-[40rem] h-[40rem] overflow-hidden">
                {/* <div
                    className="absolute inset-0 z-2"
                    style={{
                        boxShadow: `inset 0 0 30px 80px white`,
                    }}
                /> */}
                <PanZoom
                    //ref={panZoomRef}
                    // onContainerPositionChange={({ position, zoom }) => {
                    //     updateBoardPosition("x", position.x);
                    //     updateBoardPosition("y", position.y);
                    // }}
                >
                    <div className="w-96 h-96 bg-gray-300">
                        <Element id="s1">Active Users: {others.length}</Element>
                        <Element id="s2">{userId}</Element>
                    </div>
                </PanZoom>
            </div>
        </main>
    );
}
