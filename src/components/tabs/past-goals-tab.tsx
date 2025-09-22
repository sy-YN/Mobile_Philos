
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, ArrowLeft } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type PastGoal = {
  month: string;
  year: number;
  goal: string;
  achievement: number;
  trend: "up" | "down" | "stable";
};

const generatePastGoals = (): PastGoal[] => {
  const goals = [
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

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = `${date.getMonth() + 1}月`;
    const year = date.getFullYear();
    const achievement = Math.floor(Math.random() * 61) + 40; // 40% to 100%
    const lastAchievement = data[data.length -1]?.achievement ?? achievement;
    
    let trend: 'up' | 'down' | 'stable';
    if(i === 11) {
        trend = 'stable';
    } else {
        if (achievement > lastAchievement + 5) {
            trend = "up";
        } else if (achievement < lastAchievement - 5) {
            trend = "down";
        } else {
            trend = "stable";
        }
    }
    
    data.push({
      month,
      year,
      goal: goals[i],
      achievement,
      trend,
    });
  }
  return data;
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
  const pastGoals = useMemo(() => generatePastGoals(), []);

  if (!show) {
    return null;
  }

  return (
    <div className={cn("absolute inset-0 z-30 bg-background flex flex-col transition-opacity duration-300", show ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
      <header className="px-4 py-3 flex items-center border-b shrink-0">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onNavigateBack}>
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
        <p className="p-4 text-sm text-muted-foreground">過去12ヶ月の部署目標とその達成状況です。</p>
        <Table>
          <TableHeader className="sticky top-0 bg-background/95 backdrop-blur-sm z-10">
            <TableRow>
              <TableHead className="w-[100px]">年月</TableHead>
              <TableHead>目標</TableHead>
              <TableHead className="w-[150px]">達成率</TableHead>
              <TableHead className="w-[120px] text-center">推移</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pastGoals.map((item, index) => (
              <TableRow key={`${item.year}-${item.month}`}>
                <TableCell className="font-medium">
                  <div>{item.year}年</div>
                  <div className="text-lg font-bold">{item.month}</div>
                </TableCell>
                <TableCell>{item.goal}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={item.achievement} className="h-2" />
                    <span className="text-xs font-mono w-10 text-right">
                      {item.achievement}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                    <div className="h-10 w-full">
                         <ChartContainer config={chartConfig} className="w-full h-full aspect-auto">
                            <AreaChart
                                accessibilityLayer
                                data={pastGoals.slice(Math.max(0, index - 5), index + 1)}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
