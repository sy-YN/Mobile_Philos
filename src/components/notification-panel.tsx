
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  fullContent?: string;
};

type NotificationPanelProps = {
  isOpen: boolean;
  notifications: Notification[];
  onClose: () => void;
  onNotificationSelect: (notification: Notification) => void;
};

export function NotificationPanel({ isOpen, notifications, onNotificationSelect, onClose }: NotificationPanelProps) {
  return (
    <div
      className={cn(
        "absolute top-20 right-4 z-40 w-80 transition-all duration-300 ease-in-out",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      )}
    >
      <Card className="shadow-2xl">
        <CardHeader className="p-4 border-b">
          <CardTitle className="text-base">通知</CardTitle>
        </CardHeader>
        <CardContent className="p-0 max-h-64 overflow-y-auto">
          {notifications.map((notification, index) => (
            <button
              key={notification.id}
              onClick={() => onNotificationSelect(notification)}
              className={cn(
                "w-full text-left p-4 hover:bg-muted/50 transition-colors",
                index < notifications.length - 1 && "border-b"
              )}
            >
              <p className="font-semibold text-sm text-card-foreground">{notification.title}</p>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
