import CollaborativeComponent from "@/components/collaborative-components/CollaborativeComponent";
import { Room } from "@/components/collaborative-components/Room";

interface Entity {
    type: "player" | "monster" | "npc";
    name: string;
    image: string;
    position: {
        x: number;
        y: number;
    };
    size: number;
}

interface BattlefieldInstanceProps {
    initialPosition: {
        x: number;
        y: number;
    };
    initialZoom: number;
    size: number;
    mapImage: string;
    assets: Entity[];
}

function BattlefieldInstance(props: BattlefieldInstanceProps) {
    return <div>shit</div>;
}

<BattlefieldInstance
    initialPosition={{ x: 100, y: 100 }}
    initialZoom={0.85} // 0.1 -> 2
    size={300}
    mapImage="/selectedMap"
    assets={[
        {
            type: "player",
            name: "Barthen Wester Smith",
            image: "/picture",
            position: {
                x: 13,
                y: 4,
            },
            size: 1,
        },
        {
            type: "monster",
            name: "Hydra",
            image: "/hydra",
            position: {
                x: 10,
                y: 10,
            },
            size: 4,
        },
    ]}
/>;

export default function Page() {
    return (
        <Room>
            <CollaborativeComponent />
        </Room>
    );
}
