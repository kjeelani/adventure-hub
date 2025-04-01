import {
    useRef,
    useState,
    ReactNode,
    cloneElement,
    isValidElement,
    useEffect,
    useMemo,
} from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";

interface PanZoomProps {
    children: ReactNode;
    minZoom?: number;
    maxZoom?: number;
    onContainerPositionChange?: (data: {
        position: { x: number; y: number };
        zoom: number;
    }) => void;
}

export default function PanZoom({
    children,
    minZoom = 0.5,
    maxZoom = 3,
    onContainerPositionChange,
}: PanZoomProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [zoom, setZoom] = useState(1);

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        //e.preventDefault();
        const scaleFactor = 0.1;
        const newZoom = Math.min(
            maxZoom,
            Math.max(minZoom, zoom - e.deltaY * scaleFactor * 0.01)
        );
        setZoom(newZoom);
        onContainerPositionChange?.({ position: { x: 0, y: 0 }, zoom: newZoom }); // if needed
    };

    const mountedChildren = useMemo(() => {
        const result: ReactNode[] = []
        React.Children.forEach(children, (child, index) => {
            
        })
        return result;
    }, [children, zoom]);

    return (
        <motion.div
            ref={containerRef}
            className="w-fit h-fit overflow-hidden touch-none"
            drag
            dragMomentum={false}
            onWheel={handleWheel}
            style={{ scale: zoom }}
        >
            {children}
        </motion.div>
    );
}

interface ElementProps {
    id: string;
    children: ReactNode;
    containerRef?: React.RefObject<HTMLDivElement>;
    zoom?: number;
}

export function Element({ id, children, containerRef, zoom }: ElementProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const scaledX = useTransform(x, (latest) => latest / (zoom ?? 1));
    const scaledY = useTransform(y, (latest) => latest / (zoom ?? 1));

    useEffect(() => {
        console.log(containerRef, zoom); // Check if containerRef and zoom are passed correctly
    }, [containerRef, zoom]);

    return (
        <motion.div
            drag
            dragMomentum={false}
            dragConstraints={containerRef}
            className="absolute bg-white p-2 rounded shadow"
            style={{
                x: scaledX,
                y: scaledY
            }}
        >
            {children}
        </motion.div>
    );
}
