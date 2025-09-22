
'use client';
import { Award, BarChart, Heart, MessageSquare, Target, Trophy, Crown, Users, BookOpen, Medal, Star } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allTeamGoalsData as goalsData } from './dashboard-tab';
import { valuesItems } from '@/lib/company-philosophy';
import { cn } from '@/lib/utils';


const individualMvpRanking = [
    { id: 1, name: '山田 太郎', avatar: 'https://picsum.photos/seed/p1/100/100', score: 98.5 },
    { id: 2, name: '渡辺 久美子', avatar: 'https://picsum.photos/seed/p4/100/100', score: 95.2 },
    { id: 3, name: '田中 雄大', avatar: 'https://picsum.photos/seed/p5/100/100', score: 92.8 },
];

const individualLikesRanking = [
    { id: 1, name: '伊藤 健太', avatar: 'https://picsum.photos/seed/p3/100/100', likes: 152 },
    { id: 2, name: '山田 太郎', avatar: 'https://picsum.photos/seed/p1/100/100', likes: 148 },
    { id: 3, name: '佐藤 あきら', avatar: 'https://picsum.photos/seed/p6/100/100', likes: 121 },
];

const departmentAchievementRanking = [
    { id: 1, name: '営業部', progress: 115 },
    { id: 2, name: '開発部', progress: 98 },
    { id: 3, name: 'マーケティング部', progress: 92 },
];

const departmentPhilosophyRanking = [
    { id: 1, name: '開発部', score: 95 },
    { id: 2, name: '人事部', score: 88 },
    { id: 3, name: '営業部', score: 85 },
];


export function RankingTab() {
    
    const renderRankingList = (items: any[], renderItem: (item: any, index: number) => React.ReactNode) => (
        <div className="space-y-3">
            {items.map((item, index) => renderItem(item, index))}
        </div>
    );

    return (
        <div className="p-4 h-full flex flex-col">
            <header className="flex items-center gap-2 mb-6 pt-2 shrink-0">
                <Trophy className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground font-headline">月間ランキング</h2>
            </header>

            <Tabs defaultValue="individual" className="w-full flex-grow flex flex-col">
                <TabsList className="grid w-full grid-cols-2 shrink-0">
                    <TabsTrigger value="individual">
                        <Trophy className="h-4 w-4 mr-2" />
                        個人
                    </TabsTrigger>
                    <TabsTrigger value="department">
                        <Users className="h-4 w-4 mr-2" />
                        部署
                    </TabsTrigger>
                </TabsList>
                <div className="flex-grow overflow-y-auto mt-4 -mr-4 pr-4">
                    <TabsContent value="individual" className="space-y-6 m-0">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Award className="text-yellow-500" />
                                    個人MVP
                                </CardTitle>
                                <CardDescription>目標達成、理念体現などを総合評価</CardDescription>
                            </CardHeader>
                            <CardContent>
                               {renderRankingList(individualMvpRanking, (item, index) => (
                                   <RankingListItem 
                                       key={item.id} 
                                       index={index}
                                       avatar={item.avatar}
                                       title={item.name} 
                                       value={`${item.score} pt`}
                                   />
                               ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Heart className="text-red-500" />
                                    いいね獲得数
                                </CardTitle>
                                <CardDescription>投稿やコメントへのいいね総数</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {renderRankingList(individualLikesRanking, (item, index) => (
                                    <RankingListItem 
                                        key={item.id} 
                                        index={index} 
                                        avatar={item.avatar}
                                        title={item.name}
                                        value={`${item.likes} いいね`}
                                    />
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="department" className="space-y-6 m-0">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                   <Target className="text-blue-500" />
                                   部署別 目標達成率
                                </CardTitle>
                                 <CardDescription>部署ごとの月間目標の達成率</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {renderRankingList(departmentAchievementRanking, (item, index) => (
                                    <RankingListItem
                                        key={item.id}
                                        index={index}
                                        title={item.name}
                                        value={`${item.progress}%`}
                                    />
                                ))}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                   <BookOpen className="text-green-500" />
                                   部署別 理念浸透スコア
                                </CardTitle>
                                 <CardDescription>理念の理解度や実践度をスコア化</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {renderRankingList(departmentPhilosophyRanking, (item, index) => (
                                    <RankingListItem
                                        key={item.id}
                                        index={index}
                                        title={item.name}
                                        value={`${item.score} pt`}
                                    />
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}

const RankingListItem = ({ index, avatar, title, subtitle, value }: { index: number; avatar?: string; title: string; subtitle?: string; value: string; }) => {
    const rankIcons = [
        <Crown key="1" className="text-yellow-400 fill-yellow-400" />,
        <Medal key="2" className="text-gray-400 fill-gray-400" />,
        <Star key="3" className="text-yellow-700 fill-yellow-700" />
    ];
    
    return (
        <div className="flex items-center gap-4 p-2 rounded-lg transition-colors hover:bg-muted/50">
            <div className={`flex items-center justify-center font-bold text-lg w-8 h-8 shrink-0`}>
                {rankIcons[index] || <span className="text-muted-foreground text-sm w-5 text-center">{index + 1}</span>}
            </div>
            {avatar && <Image src={avatar} alt={title} width={40} height={40} className="rounded-full" data-ai-hint="person portrait" />}
            <div className="flex-1 min-w-0">
                <p className="font-semibold truncate text-sm">{title}</p>
                {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
            </div>
            <div className="font-bold text-right text-sm">{value}</div>
        </div>
    );
};
