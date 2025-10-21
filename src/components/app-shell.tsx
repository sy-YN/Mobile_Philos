
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-neutral-800 dark:bg-black rounded-[60px] p-2 shadow-2xl w-[375px] h-[812px] mx-auto transition-colors">
      <div className="w-full h-full bg-white dark:bg-neutral-950 rounded-[50px] overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-neutral-800 dark:bg-black rounded-b-2xl z-50 transition-colors"></div>
        <div className="w-full h-full bg-background overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
