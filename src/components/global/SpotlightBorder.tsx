import { Spotlight } from "../ui/spotlight";

interface SpotlightBorderProps {
    children: React.ReactNode;
}

export default function SpotlightBorder({ children }: SpotlightBorderProps) {
    return (
        <div className="relative h-full overflow-hidden rounded-lg bg-background/30 p-[2px]">
            <Spotlight className="from-green via-blue to-purple blur-3xl" size={100} />
            <div className="relative h-full w-full rounded-lg bg-background border border-maticblack/10 p-4">
                {children}
            </div>
        </div>
    );
}