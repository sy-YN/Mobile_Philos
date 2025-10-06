
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function OtherTab() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-semibold text-foreground font-headline">その他</h2>
        <div className="space-y-3">
          <Link href="/settings" passHref>
            <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <CardTitle className="text-base mb-1">設定</CardTitle>
              <CardDescription className="text-sm">アプリの表示設定などを変更します</CardDescription>
            </Card>
          </Link>
          <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
            <CardTitle className="text-base mb-1">ヘルプ</CardTitle>
            <CardDescription className="text-sm">使い方ガイドとFAQ</CardDescription>
          </Card>
          <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
            <CardTitle className="text-base mb-1">フィードバック</CardTitle>
            <CardDescription className="text-sm">アプリの改善にご協力ください</CardDescription>
          </Card>
        </div>
      </div>
    </div>
  );
}
