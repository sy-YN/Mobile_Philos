
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar as CalendarIcon, Bell } from "lucide-react";

type AppHeaderProps = {
  notificationCount: number;
  onNotificationClick: () => void;
  onCalendarClick: () => void;
};

export function AppHeader({ notificationCount, onNotificationClick, onCalendarClick }: AppHeaderProps) {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 px-4 pt-8 pb-3 flex items-center justify-between shrink-0 z-20">
      <div className="flex items-center gap-2">
        <Building2 className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-bold text-foreground font-headline">Philos</h1>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onCalendarClick}>
          <CalendarIcon className="h-4 w-4" />
          <span className="sr-only">カレンダーを開く</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8"
          onClick={onNotificationClick}
        >
          <Bell className="h-4 w-4" />
          <span className="sr-only">通知</span>
          {notificationCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
              {notificationCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
}
