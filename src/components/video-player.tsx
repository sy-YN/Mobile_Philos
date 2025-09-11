
import Image from "next/image";
import { Play } from "lucide-react";

export function VideoPlayer() {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-black group cursor-pointer shadow-lg">
      <Image
        src="https://picsum.photos/seed/corpvideo/1280/720"
        alt="Company broadcast"
        width={1280}
        height={720}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        data-ai-hint="corporate meeting"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
          <Play className="h-7 w-7 text-white drop-shadow-lg ml-1" fill="currentColor" />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="font-bold text-base drop-shadow-md font-headline">Q4 Company All-Hands</h3>
        <p className="text-sm opacity-90 drop-shadow-md">A message from our CEO</p>
      </div>
    </div>
  );
}
