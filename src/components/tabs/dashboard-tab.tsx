
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function DashboardTab() {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-semibold text-foreground font-headline">ダッシュボード</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">エンゲージメント</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">アクティブユーザー</span>
            <span className="font-medium text-primary">156</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">総投稿数</span>
            <span className="font-medium text-primary">24</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">総コメント数</span>
            <span className="font-medium text-primary">89</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">今月の目標</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">参加率</span>
              <span className="font-semibold text-primary">89%</span>
            </div>
            <Progress value={89} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">満足度スコア</span>
              <span className="font-semibold text-primary">92%</span>
            </div>
            <Progress value={92} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
