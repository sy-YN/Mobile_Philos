
'use client';

import { useState, useEffect } from "react";
import { HelpCircle, Settings, TrendingUp, Target, ChevronDown, Award, BarChart, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { Bar, XAxis, YAxis, CartesianGrid, ComposedChart, Line } from "recharts";

const salesChartData = [
  { month: "4月", "売上金額": 50, "売上率": 55 },
  { month: "5月", "売上金額": 60, "売上率": 62 },
  { month: "6月", "売上金額": 75, "売上率": 78 },
  { month: "7月", "売上金額": 65, "売上率": 70 },
  { month: "8月", "売上金額": 80, "売上率": 85 },
  { month: "9月", "売上金額": 90, "売上率": 95 },
];

const salesChartConfig = {
  "売上金額": {
    label: "売上金額 (百万円)",
    color: "hsl(var(--chart-1))",
    icon: BarChart,
  },
  "売上率": {
    label: "売上率 (%)",
    color: "hsl(var(--chart-2))",
    icon: LineChart,
  },
};

const CircularProgress = ({ value }: { value: number }) => {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);

  useEffect(() => {
    const offset = circumference - (value / 100) * circumference;
    setStrokeDashoffset(offset);
  }, [value, circumference]);

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-64 h-64 transform -rotate-90 drop-shadow-lg" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r={radius} stroke="hsl(var(--border))" strokeWidth="16" fill="transparent" />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--accent) / 0.8)" />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth="16"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">今日までの達成率</span>
        </div>
        <div className="text-4xl font-bold text-foreground">{value}%</div>
        <div className="text-xs text-muted-foreground">目標まで あと{100 - value}%</div>
      </div>
    </div>
  );
};


export function DashboardTab() {
  const [activeTab, setActiveTab] = useState("目標");
  const [monthlyTarget, setMonthlyTarget] = useState("企業理念促進");
  const [showAward, setShowAward] = useState(true);
  
  const currentMonth = new Date().toLocaleString('ja-JP', { year: 'numeric', month: 'long' });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "プロフィール") {
      setMonthlyTarget("新システムの機能をリリースまで行く");
      setShowAward(false);
    } else {
      setMonthlyTarget("企業理念促進");
      setShowAward(value === "目標");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="px-4 py-3 flex justify-between items-center bg-card-foreground/5 border-b">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-accent"><HelpCircle className="w-5 h-5" /></Button>
        <h1 className="text-base font-semibold text-foreground">{currentMonth}</h1>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-accent"><Settings className="w-5 h-5" /></Button>
      </header>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-grow">
        <TabsList className="grid w-full grid-cols-3 rounded-none h-auto p-0 bg-card border-b">
          <TabsTrigger value="目標" className="rounded-none py-3 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">目標</TabsTrigger>
          <TabsTrigger value="売上" className="rounded-none py-3 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">売上</TabsTrigger>
          <TabsTrigger value="プロフィール" className="rounded-none py-3 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">プロフィール</TabsTrigger>
        </TabsList>
        
        <div className="p-4 space-y-6">
          <div className={`${activeTab === "売上" ? 'hidden' : 'block'}`}>
            <div className="flex items-center justify-between">
              <Button variant="link" className="text-accent text-sm p-0 h-auto gap-2">
                <TrendingUp className="w-4 h-4" />
                1年前を見る
              </Button>
              <div className="text-xs text-muted-foreground">株式会社テックソリューション</div>
            </div>

            <div className="mt-6 mb-6">
              <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full text-sm">
                <Target className="w-4 h-4 text-accent" />
                <span className="text-foreground/80">月間目標</span>
                <span className="font-semibold text-accent">{monthlyTarget}</span>
                <span className="cursor-pointer">✏️</span>
              </div>
            </div>

            <div className="relative">
              <CircularProgress value={70} />
              
              {activeTab === 'プロフィール' && (
                <div className="absolute -bottom-4 right-4">
                  <Button className="rounded-full shadow-lg">共有</Button>
                </div>
              )}
              
              {showAward && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-lg">
                    <Award className="w-4 h-4" />
                    <span>理念浸透が向上しました！</span>
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
                </div>
              )}
            </div>
          </div>
          
          <TabsContent value="目標" className="mt-0">
             <div className="relative flex justify-center items-center gap-4 pt-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="rounded-full shadow-md gap-2">
                      <span>部署名</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>営業部</DropdownMenuItem>
                    <DropdownMenuItem>マーケティング部</DropdownMenuItem>
                    <DropdownMenuItem>開発部</DropdownMenuItem>
                    <DropdownMenuItem>人事部</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline" className="rounded-full shadow-sm border-accent/30 text-accent hover:bg-accent/10 hover:text-accent">
                  過去の目標
                </Button>
            </div>
          </TabsContent>
          <TabsContent value="売上" className="mt-0">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-blue-500/10 border-blue-500/20">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm text-blue-600 dark:text-blue-400 mb-1">平均売上</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="font-bold text-lg text-blue-800 dark:text-blue-300">¥2,850,000</div>
                    <div className="text-xs text-blue-500 dark:text-blue-400">前月比 +12%</div>
                  </CardContent>
                </Card>
                <Card className="bg-green-500/10 border-green-500/20">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm text-green-600 dark:text-green-400 mb-1">合計売上見込み</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="font-bold text-lg text-green-800 dark:text-green-300">¥4,200,000</div>
                    <div className="text-xs text-green-500 dark:text-green-400">目標達成まで 85%</div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>売上推移</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer config={salesChartConfig}>
                    <ComposedChart data={salesChartData}>
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                      <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
                      <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="売上金額" fill="hsl(var(--chart-1))" radius={4} yAxisId="left" />
                      <Line dataKey="売上率" type="monotone" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} yAxisId="right" />
                    </ComposedChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="プロフィール" className="mt-0">
             <div className="relative flex justify-center items-center gap-4 pt-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="rounded-full shadow-md gap-2">
                      <span>部署名</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>営業部</DropdownMenuItem>
                    <DropdownMenuItem>マーケティング部</DropdownMenuItem>
                    <DropdownMenuItem>開発部</DropdownMenuItem>
                    <DropdownMenuItem>人事部</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline" className="rounded-full shadow-sm border-accent/30 text-accent hover:bg-accent/10 hover:text-accent">
                  過去の目標
                </Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
