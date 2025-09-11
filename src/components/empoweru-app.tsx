
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

const notifications: Notification[] = [
  { id: 1, title: '新しい経営陣メッセージ', message: '第4四半期の目標について', time: '5分前' },
  { id: 2, title: '掲示板の更新', message: '新しい投稿があります', time: '15分前' },
  { id: 3, title: 'ダッシュボード更新', message: '週間レポートの準備ができました', time: '1時間前' },
];

export default function EmpowerUApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleCalendarClick = () => {
    setActiveTab('calendar');
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
      />

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
