
'use client';

import { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import { BottomNav } from '@/components/bottom-nav';
import { NotificationPanel, type Notification } from '@/components/notification-panel';
import { HomeTab } from '@/components/tabs/home-tab';
import { PhilosophyTab } from '@/components/tabs/philosophy-tab';
import { DashboardTab } from '@/components/tabs/dashboard-tab';
import { OtherTab } from '@/components/tabs/other-tab';
import { CalendarTab } from '@/components/tabs/calendar-tab';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const notifications: Notification[] = [
  { id: 1, title: '新しい経営陣メッセージ', message: '第4四半期の目標について', time: '5分前', fullContent: '社員の皆様、CEOの田中です。第4四半期に向けて、私たちは「顧客満足度の向上」と「新市場への展開」という2つの大きな目標を掲げます。皆様の協力が不可欠です。詳細は添付資料をご確認ください。' },
  { id: 2, title: '掲示板の更新', message: '新しい投稿があります', time: '15分前', fullContent: '山田さんが「新製品アイデア募集」という投稿をしました。素晴らしいアイデアだと思いますので、ぜひご覧いただき、コメントで議論を深めてください。' },
  { id: 3, title: 'ダッシュボード更新', message: '週間レポートの準備ができました', time: '1時間前', fullContent: '先週の全部門のパフォーマンスをまとめた週間レポートがダッシュボードで確認可能になりました。各自、目標達成率や進捗を確認してください。' },
];

export default function EmpowerUApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const handleCalendarClick = () => {
    setActiveTab('calendar');
  };

  const handleNotificationSelect = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowNotifications(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'philosophy':
        return <PhilosophyTab />;
      case 'dashboard':
        return <DashboardTab />;
      case 'other':
        return <OtherTab />;
      case 'calendar':
        return <CalendarTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <AppShell>
      <AppHeader
        notificationCount={notifications.length}
        onNotificationClick={() => setShowNotifications(!showNotifications)}
        onCalendarClick={handleCalendarClick}
      />

      <NotificationPanel
        isOpen={showNotifications}
        notifications={notifications}
        onClose={() => setShowNotifications(false)}
        onNotificationSelect={handleNotificationSelect}
      />

      <Dialog open={!!selectedNotification} onOpenChange={(isOpen) => !isOpen && setSelectedNotification(null)}>
        <DialogContent className="max-w-xs">
          {selectedNotification && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedNotification.title}</DialogTitle>
                <DialogDescription>{selectedNotification.time}</DialogDescription>
              </DialogHeader>
              <div className="prose prose-sm dark:prose-invert max-h-[60vh] overflow-y-auto">
                <p>{selectedNotification.fullContent}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>


      <main
        className="h-[calc(100%-130px)] overflow-y-auto"
        onClick={() => showNotifications && setShowNotifications(false)}
      >
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </AppShell>
  );
}
