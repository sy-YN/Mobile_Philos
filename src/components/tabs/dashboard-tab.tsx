
'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { HelpCircle, Settings, TrendingUp, Target, ChevronDown, Award, BarChart, LineChart, Edit, Users, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { Bar, XAxis, YAxis, CartesianGrid, ComposedChart, Line } from "recharts";

const salesChartData = [
  { month: "4月", "売上": 50, "利益率": 15 },
  { month: "5月", "売上": 60, "利益率": 18 },
  { month: "6月", "売上": 75, "利益率": 20 },
  { month: "7月", "売上": 65, "利益率": 17 },
  { month: "8月", "売上": 80, "利益率": 22 },
  { month: "9月", "売上": 90, "利益率": 25 },
];

const salesChartConfig = {
  "売上": {
    label: "売上 (百万円)",
    color: "hsl(var(--chart-1))",
    icon: BarChart,
  },
  "利益率": {
    label: "利益率 (%)",
    color: "hsl(var(--chart-2))",
    icon: LineChart,
  },
};

const allTeamGoalsData = [
    { id: 1, name: '山田 太郎', avatar: 'https://picsum.photos/seed/p1/100/100', goal: '新規顧客を5件獲得する', progress: 60 },
    { id: 2, name: '鈴木 花子', avatar: 'https://picsum.photos/seed/p2/100/100', goal: '既存顧客の満足度調査を実施', progress: 90 },
    { id: 3, name: '伊藤 健太', avatar: 'https://picsum.photos/seed/p3/100/100', goal: '新機能のUIデザインを完成させる', progress: 30 },
    { id: 4, name: '渡辺 久美子', avatar: 'https://picsum.photos/seed/p4/100/100', goal: '採用面接を10件実施する', progress: 100 },
    { id: 5, name: '田中 雄大', avatar: 'https://picsum.photos/seed/p5/100/100', goal: '新しいマーケティング戦略を立案する', progress: 75 },
    { id: 6, name: '佐藤 あきら', avatar: 'https://picsum.photos/seed/p6/100/100', goal: '社内システムのバグを修正する', progress: 50 },
];

const CircularProgress = ({ value }: { value: number }) => {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);

  useEffect(() => {
    // Ensure the value is within the 0-100 range
    const clampedValue = Math.max(0, Math.min(value, 100));
    const offset = circumference - (clampedValue / 100) * circumference;
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
  
  const [departmentGoal, setDepartmentGoal] = useState("企業理念促進");
  const [departmentProgress, setDepartmentProgress] = useState(70);
  const [personalGoal, setPersonalGoal] = useState("新システムの機能をリリースまで行く");
  const [personalProgress, setPersonalProgress] = useState(45);
  
  const [tempPersonalGoal, setTempPersonalGoal] = useState(personalGoal);
  const [tempPersonalProgress, setTempPersonalProgress] = useState(personalProgress);

  const [showAward, setShowAward] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isTeamGoalsDialogOpen, setIsTeamGoalsDialogOpen] = useState(false);
  
  const [teamGoalsSearchTerm, setTeamGoalsSearchTerm] = useState('');

  const currentMonth = new Date().toLocaleString('ja-JP', { year: 'numeric', month: 'long' });
  const latestSalesData = salesChartData[salesChartData.length - 1];
  const previousSalesData = salesChartData[salesChartData.length - 2];


  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setShowAward(value === "目標");
  };

  const handleSaveChanges = () => {
    setPersonalGoal(tempPersonalGoal);
    setPersonalProgress(tempPersonalProgress);
    setIsEditDialogOpen(false);
  };
  
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setTempPersonalGoal(personalGoal);
      setTempPersonalProgress(personalProgress);
    }
    setIsEditDialogOpen(open);
  }

  const currentGoal = activeTab === "個人" ? personalGoal : departmentGoal;
  const currentProgress = activeTab === "個人" ? personalProgress : departmentProgress;

  const filteredTeamGoals = allTeamGoalsData.filter(member =>
    member.name.toLowerCase().includes(teamGoalsSearchTerm.toLowerCase())
  );

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
          <TabsTrigger value="個人" className="rounded-none py-3 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">個人</TabsTrigger>
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
                <span className="font-semibold text-accent">{currentGoal}</span>
              </div>
            </div>

            <div className="relative">
              <CircularProgress value={currentProgress} />
              
              {activeTab === '個人' && (
                <div className="absolute -bottom-4 right-4">
                   <Dialog open={isTeamGoalsDialogOpen} onOpenChange={setIsTeamGoalsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="rounded-full shadow-lg">共有</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xs">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary" />
                          メンバーの目標進捗
                        </DialogTitle>
                        <DialogDescription>
                          メンバーの個人目標と進捗状況を確認できます。
                        </DialogDescription>
                      </DialogHeader>
                      <div className="relative my-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="名前で検索..."
                          value={teamGoalsSearchTerm}
                          onChange={(e) => setTeamGoalsSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <div className="space-y-4 max-h-[50vh] overflow-y-auto -mr-4 pr-4">
                        {filteredTeamGoals.length > 0 ? (
                          filteredTeamGoals.map((member) => (
                            <div key={member.id} className="flex items-start gap-3">
                              <Image
                                src={member.avatar}
                                alt={member.name}
                                width={40}
                                height={40}
                                className="rounded-full mt-1"
                                data-ai-hint="person portrait"
                              />
                              <div className="flex-1">
                                <p className="font-semibold text-sm">{member.name}</p>
                                <p className="text-xs text-muted-foreground mb-2">{member.goal}</p>
                                <div className="flex items-center gap-2">
                                  <Progress value={member.progress} className="h-2" />
                                  <span className="text-xs font-mono text-muted-foreground w-10 text-right">{member.progress}%</span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground text-center py-4">該当するメンバーはいません。</p>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
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
                <Card>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-sm font-medium text-muted-foreground">売上</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-1">
                    <div className="text-2xl font-bold">¥{latestSalesData['売上']}M</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-sm font-medium text-muted-foreground">利益率</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-1">
                    <div className="text-2xl font-bold">{latestSalesData['利益率']}%</div>
                     <p className="text-xs text-muted-foreground">前月比 {latestSalesData['利益率'] - previousSalesData['利益率']}pt</p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>売上推移</CardTitle>
                </CardHeader>
                <CardContent className="h-[22rem] -mx-4">
                  <ChartContainer config={salesChartConfig}>
                    <ComposedChart data={salesChartData}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <YAxis
                        yAxisId="left"
                        orientation="left"
                        stroke="hsl(var(--chart-1))"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="hsl(var(--chart-2))"
                        tickLine={false}
                        axisLine={false}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar
                        dataKey="売上"
                        fill="hsl(var(--chart-1))"
                        radius={4}
                        yAxisId="left"
                      />
                      <Line
                        dataKey="利益率"
                        type="monotone"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                        yAxisId="right"
                      />
                    </ComposedChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="個人" className="mt-0">
             <div className="relative flex justify-center items-center gap-4 pt-10">
                <Dialog open={isEditDialogOpen} onOpenChange={handleOpenChange}>
                  <DialogTrigger asChild>
                    <Button className="rounded-full shadow-md gap-2">
                      <Edit className="w-4 h-4" />
                      <span>編集</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-sm">
                    <DialogHeader>
                      <DialogTitle>個人目標の編集</DialogTitle>
                      <DialogDescription>
                        今月の個人目標と現在の達成率を設定してください。
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="goal">目標</Label>
                        <Input
                          id="goal"
                          value={tempPersonalGoal}
                          onChange={(e) => setTempPersonalGoal(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="progress">達成率 ({tempPersonalProgress}%)</Label>
                        <Slider
                          id="progress"
                          min={0}
                          max={100}
                          step={5}
                          value={[tempPersonalProgress]}
                          onValueChange={(value) => setTempPersonalProgress(value[0])}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                         <Button type="button" variant="outline">キャンセル</Button>
                      </DialogClose>
                      <Button type="submit" onClick={handleSaveChanges}>保存</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

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

    