
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, ClipboardList, BarChart3, MoreHorizontal } from "lucide-react";

type BottomNavProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const navItems = [
  { id: 'home', label: 'ホーム', icon: Home },
  { id: 'philosophy', label: '理念', icon: MessageSquare },
  { id: 'board', label: '掲示板', icon: ClipboardList },
  { id: 'dashboard', label: 'ダッシュボード', icon: BarChart3 },
  { id: 'other', label: 'その他', icon: MoreHorizontal },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border/50 px-2 py-1 rounded-b-[48px] overflow-hidden z-20 shrink-0">
      <div className="flex items-center justify-around pb-4">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-lg"
            onClick={() => onTabChange(item.id)}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}
