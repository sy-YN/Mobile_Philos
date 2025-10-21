import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Home, BookOpen, LayoutDashboard, Trophy, Bell, Calendar } from "lucide-react";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Philos",
  description: "Your internal communication app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex flex-col h-screen bg-secondary">
          <header className="flex items-center justify-between p-4 bg-card border-b">
            <h1 className="text-xl font-bold text-primary">Philos</h1>
            <div className="flex items-center space-x-4">
              <button>
                <Calendar className="h-6 w-6" />
              </button>
              <button>
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </header>
          
          <main className="flex-grow overflow-y-auto p-4">
            {children}
          </main>

          <footer className="bg-card border-t">
            <nav className="flex justify-around p-2">
              <Link href="/" className="flex flex-col items-center text-primary">
                <Home className="h-6 w-6" />
                <span className="text-xs">ホーム</span>
              </Link>
              <Link href="#" className="flex flex-col items-center text-gray-500 hover:text-primary">
                <BookOpen className="h-6 w-6" />
                <span className="text-xs">理念</span>
              </Link>
              <Link href="#" className="flex flex-col items-center text-gray-500 hover:text-primary">
                <LayoutDashboard className="h-6 w-6" />
                <span className="text-xs">ダッシュボード</span>
              </Link>
              <Link href="#" className="flex flex-col items-center text-gray-500 hover:text-primary">
                <Trophy className="h-6 w-6" />
                <span className="text-xs">ランキング</span>
              </Link>
            </nav>
          </footer>
        </div>
      </body>
    </html>
  );
}
