
'use client';

import { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import { BottomNav } from '@/components/bottom-nav';
import { NotificationPanel, type Notification } from '@/components/notification-panel';
import { HomeTab } from '@/components/tabs/home-tab';
import { BoardTab } from '@/components/tabs/board-tab';
import { DashboardTab } from '@/components/tabs/dashboard-tab';
import { OtherTab } from '@/components/tabs/other-tab';

const notifications: Notification[] = [
  { id: 1, title: 'New Executive Message', message: 'Regarding Q4 goals', time: '5m ago' },
  { id: 2, title: 'Board Update', message: 'A new post is available', time: '15m ago' },
  { id: 3, title: 'Dashboard Updated', message: 'Weekly report is ready', time: '1h ago' },
];

export default function EmpowerUApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'board':
        return <BoardTab />;
      case 'dashboard':
        return <DashboardTab />;
      case 'other':
        return <OtherTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <AppShell>
      <AppHeader
        notificationCount={notifications.length}
        onNotificationClick={() => setShowNotifications(!showNotifications)}
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
