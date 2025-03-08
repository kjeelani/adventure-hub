import React, { useEffect, useRef, useState } from "react";

export default function Background() {
    const [bounds, setBounds] = useState({
        width: 0,
        height: 0,
    });

    const player1Ref = useRef<HTMLDivElement>(null);
    const player2Ref = useRef<HTMLDivElement>(null);
    const monsterRef = useRef<HTMLDivElement>(null);
    const [attackStart, setAttackStart] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [moveStart, setMoveStart] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [attackEnd, setAttackEnd] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setBounds({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (!player1Ref.current || !monsterRef.current) return;

        const { top: playerTop, left: playerLeft } =
            player1Ref.current.getBoundingClientRect();
        const { top: monsterTop, left: monsterLeft } =
            monsterRef.current.getBoundingClientRect();

        setAttackStart({
            x: playerLeft + 30,
            y: playerTop + 30,
        });

        setAttackEnd({ x: monsterLeft, y: monsterTop + 60 });
    }, [player1Ref, monsterRef]);

    useEffect(() => {
        if (!player2Ref.current) return;

        const { top, left } = player2Ref.current.getBoundingClientRect();

        setMoveStart({
            x: left + 30,
            y: top + 30,
        });
    }, [player2Ref]);
    return (
        <>
            <svg
                className="absolute z-1 h-screen w-screen"
                viewBox={`0 0 ${bounds.width} ${bounds.height}`}
            >
                <path
                    className="animate-dash"
                    d={`M${attackStart.x},${attackStart.y} C${attackStart.x},${attackEnd.y},${attackStart.x},${attackEnd.y},${attackEnd.x},${attackEnd.y}`}
                    stroke="#d4d4d4"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="10, 10"
                />
                <text
                    x={attackStart.x - 45} // Adjust X position
                    y={attackStart.y - 75} // Adjust Y position (middle of the line)
                    fill="#737373"
                    fontSize="14"
                >
                    4d8
                </text>
            </svg>
            <svg
                className="absolute z-1 h-screen w-screen"
                viewBox={`0 0 ${bounds.width} ${bounds.height}`}
            >
                <path
                    className="realtive animate-dash"
                    d={`M${moveStart.x},${moveStart.y} v-142`}
                    stroke="#d4d4d4"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="10, 10"
                />
                <text
                    x={moveStart.x + 15} // Adjust X position
                    y={moveStart.y - 75} // Adjust Y position (middle of the line)
                    fill="#737373"
                    fontSize="14"
                >
                    112.5m
                </text>
                <circle
                    r={8}
                    stroke="#d4d4d4"
                    strokeWidth="2"
                    fill="none"
                    cx={moveStart.x}
                    cy={moveStart.y - 150}
                />
            </svg>

            <div
                className="absolute h-screen w-screen grid overflow-hidden bg-neutral-100"
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(21, 75px)`,
                    gridTemplateRows: `repeat(21, 75px)`,
                }}
            >
                <div
                    className="absolute inset-0 z-2"
                    style={{
                        boxShadow: `inset 0 0 30px 80px #f5f5f5`,
                    }}
                />
                {Array.from({
                    length: 250,
                }).map((_, i) =>
                    i === 147 ? (
                        <div
                            key={i}
                            className="flex items-center justify-center border-r border-b border-[#e5e5e5] size-[75px]"
                        >
                            <div
                                ref={player1Ref}
                                className="flex z-1 items-center justify-center size-[60px] bg-neutral-200 border-2 border-neutral-400 shadow-lg rounded-full"
                            >
                                S
                            </div>
                        </div>
                    ) : i === 36 ? (
                        <div
                            key={i}
                            className="flex items-center justify-center border-r border-b border-[#e5e5e5] size-[150px] col-span-2 row-span-2"
                        >
                            <div
                                ref={monsterRef}
                                className="flex z-1 items-center justify-center size-[120px] bg-neutral-200 border-2 border-neutral-400 shadow-lg rounded-full"
                            >
                                M
                            </div>
                        </div>
                    ) : i === 138 ? (
                        <div
                            key={i}
                            className="flex items-center justify-center border-r border-b border-[#e5e5e5] size-[75px]"
                        >
                            <div
                                ref={player2Ref}
                                className="flex z-1 items-center justify-center size-[60px] bg-neutral-200 border-2 border-neutral-400 shadow-lg rounded-full"
                            >
                                P
                            </div>
                        </div>
                    ) : (
                        <div
                            key={i}
                            className="border-r border-b border-[#e5e5e5] size-[75px]"
                        ></div>
                    )
                )}
            </div>
        </>
    );
}
