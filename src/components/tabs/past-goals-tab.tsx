
'use client';

import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart } from "recharts";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type PastGoal = {
  month: string;
  year: number;
  goal: string;
  achievement: number;
  rank?: number;
  totalParticipants?: number;
};

const generatePastGoals = (isIndividual: boolean): PastGoal[] => {
  const goals = isIndividual 
    ? [
        "新規契約を5件獲得",
        "担当顧客の満足度アンケート実施",
        "新機能のプロトタイプ作成",
        "ウェビナー資料の作成",
        "チームのコードレビューを10件実施",
        "技術ブログ記事の執筆",
        "採用候補者との面談5件",
        "社内ツールの改善提案",
        "競合製品の分析レポート作成",
        "自身のOKR達成",
        "新技術の学習とチームへの共有",
        "クライアントへの新提案",
      ]
    : [
        "新規顧客獲得数10%増",
        "既存顧客満足度95%達成",
        "新機能Aのリリース",
        "マーケティング費用5%削減",
        "チーム全体の生産性15%向上",
        "採用プロセス改善",
        "社内研修プログラムの刷新",
        "カスタマーサポート応答時間短縮",
        "WebサイトのCVR 3%改善",
        "新規事業のPoC実施",
        "アライアンスパートナー2社獲得",
        "DX推進計画の策定",
      ];
      
  const data: PastGoal[] = [];
  const now = new Date();
  const totalParticipants = 120;

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = `${date.getMonth() + 1}月`;
    const year = date.getFullYear();
    const achievement = Math.floor(Math.random() * 61) + 40; // 40% to 100%
    
    const goalData: PastGoal = {
      month,
      year,
      goal: goals[i % goals.length], // Ensure we don't go out of bounds
      achievement,
    };

    if (isIndividual) {
      goalData.rank = Math.floor(Math.random() * 20) + 1; // Random rank 1-20
      goalData.totalParticipants = totalParticipants;
    }
    
    data.push(goalData);
  }
  return data.reverse(); // Show most recent first
};

const chartConfig = {
  achievement: {
    label: "達成率",
    color: "hsl(var(--chart-1))",
  },
};

type PastGoalsTabProps = {
  show: boolean;
  departmentName: string;
  onNavigateBack: () => void;
};


export function PastGoalsTab({ show, departmentName, onNavigateBack }: PastGoalsTabProps) {
  const isIndividual = departmentName === "個人";
  const pastGoals = useMemo(() => generatePastGoals(isIndividual), [isIndividual]);

  if (!show) {
    return null;
  }

  return (
    <div className={cn("absolute inset-0 z-30 bg-background flex flex-col transition-opacity duration-300", show ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
      <header className="px-4 py-3 flex items-center border-b shrink-0 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground" onClick={onNavigateBack}>
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">戻る</span>
        </Button>
        <div className="text-center flex-1">
          <h1 className="text-base font-semibold text-foreground">過去の目標</h1>
          <p className="text-sm text-muted-foreground">{departmentName}</p>
        </div>
        <div className="w-8"></div>
      </header>
      <div className="flex-1 overflow-y-auto">
        <p className="p-4 text-sm text-muted-foreground">過去12ヶ月の{isIndividual ? "個人" : "部署"}目標とその達成状況です。</p>
        <div className="divide-y border-t">
          {pastGoals.map((item, index) => (
            <div key={`${item.year}-${item.month}`} className="p-4">
              <div className="flex items-start justify-between mb-3 gap-4">
                <div className="w-24 shrink-0">
                  <div className="text-xs text-muted-foreground">{item.year}年</div>
                  <div className="text-lg font-bold">{item.month}</div>
                   {isIndividual && item.rank && item.totalParticipants && (
                    <div className="text-xs text-primary font-semibold mt-1">
                      {item.rank}位 / {item.totalParticipants}人中
                    </div>
                  )}
                </div>
                <p className="flex-1 text-sm font-medium text-left pt-1">{item.goal}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-1/2">
                   <div className="flex items-center gap-2">
                    <Progress value={item.achievement} className="h-2" />
                    <span className="text-xs font-mono w-10 text-right">
                      {item.achievement}%
                    </span>
                  </div>
                </div>
                 <div className="w-1/2 h-10">
                   <ChartContainer config={chartConfig} className="w-full h-full aspect-auto">
                      <AreaChart
                          accessibilityLayer
                          data={pastGoals.slice(index, Math.min(index + 6, pastGoals.length)).reverse()}
                          margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      >
                          <defs>
                              <linearGradient id={`fill-gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor={item.achievement >= 80 ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))"} stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor={item.achievement >= 80 ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))"} stopOpacity={0.1}/>
                              </linearGradient>
                          </defs>
                          <Area
                              dataKey="achievement"
                              type="natural"
                              fill={`url(#fill-gradient-${index})`}
                              stroke={item.achievement >= 80 ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))"}
                              stackId="a"
                          />
                      </AreaChart>
                  </ChartContainer>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
