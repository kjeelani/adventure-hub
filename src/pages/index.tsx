import { LoaderCircle } from "lucide-react";

export default function Home() {
    return (
        // <AuthWrapper>
        <div className="flex gap-2 items-center justify-center h-screen w-screen">
            <LoaderCircle className="size-4 animate-spin" />
            <span>Loading...</span>
        </div>
        // </AuthWrapper>
    );
}
