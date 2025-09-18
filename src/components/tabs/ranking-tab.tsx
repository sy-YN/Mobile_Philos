
'use client';
import { Award, BarChart, Heart, MessageSquare, Target, Trophy, Eye } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allTeamGoalsData as goalsData } from './dashboard-tab';

const videoRanking = [
    { id: 1, title: '第4四半期 全社ミーティング', likes: 152, views: 2340 },
    { id: 2, title: 'デザインチームより', likes: 98, views: 1823 },
    { id: 3, title: 'エンジニアチームより', likes: 73, views: 1204 },
];

const postRanking = [
    { id: 1, author: '伊藤さん', content: '新しいビジョンにワクワクしています。私たち一人ひとりがどう貢献できるか...', likes: 25 },
    { id: 2, author: '山田さん', content: 'CEOのメッセージ、非常に感銘を受けました。特にDXの推進に関する部分は...', likes: 12 },
    { id: 3, author: '鈴木さん', content: '動画、とても分かりやすかったです！倍速機能も便利ですね。', likes: 8 },
];


export function RankingTab() {

    const goalAchievers = [...goalsData].sort((a, b) => b.progress - a.progress).slice(0, 3);
    
    const renderRankingList = (items: any[], renderItem: (item: any, index: number) => React.ReactNode) => (
        <div className="space-y-4">
            {items.map((item, index) => renderItem(item, index))}
        </div>
    );

    return (
        <div className="p-4">
            <header className="flex items-center gap-2 mb-6 pt-2">
                <Trophy className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground font-headline">ランキング</h2>
            </header>

            <Tabs defaultValue="engagement" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="engagement">
                        <Heart className="h-4 w-4 mr-2" />
                        エンゲージメント
                    </TabsTrigger>
                    <TabsTrigger value="achievement">
                        <Target className="h-4 w-4 mr-2" />
                        目標達成
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="engagement" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Heart className="text-red-500" />
                                動画いいね数 TOP3
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                           {renderRankingList(videoRanking, (item, index) => (
                               <RankingListItem key={item.id} index={index} title={item.title} value={`${item.likes} いいね`} />
                           ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Eye className="text-blue-500" />
                                動画視聴回数 TOP3
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                           {renderRankingList(videoRanking.sort((a,b) => b.views - a.views), (item, index) => (
                               <RankingListItem key={item.id} index={index} title={item.title} value={`${item.views} 回`} />
                           ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <MessageSquare className="text-green-500" />
                                コメントいいね数 TOP3
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {renderRankingList(postRanking, (item, index) => (
                                <RankingListItem 
                                    key={item.id} 
                                    index={index} 
                                    title={`${item.author}: 「${item.content}」`}
                                    value={`${item.likes} いいね`}
                                />
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="achievement" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                               <Award className="text-yellow-500" />
                               個人目標達成率 TOP3
                            </CardTitle>
                             <CardDescription>今月の目標達成率が高いメンバーです。</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {renderRankingList(goalAchievers, (item, index) => (
                                <RankingListItem
                                    key={item.id}
                                    index={index}
                                    avatar={item.avatar}
                                    title={item.name}
                                    subtitle={item.goal}
                                    value={`${item.progress}%`}
                                />
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

const RankingListItem = ({ index, avatar, title, subtitle, value }: { index: number; avatar?: string; title: string; subtitle?: string; value: string; }) => {
    const medals = [
        "border-yellow-400 bg-yellow-400/10", // Gold
        "border-gray-400 bg-gray-400/10", // Silver
        "border-yellow-700 bg-yellow-700/10" // Bronze
    ];
    
    return (
        <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center font-bold text-lg w-8 h-8 rounded-full border-2 ${medals[index] || 'border-border'}`}>
                {index + 1}
            </div>
            {avatar && <Image src={avatar} alt={title} width={40} height={40} className="rounded-full" data-ai-hint="person portrait" />}
            <div className="flex-1 min-w-0">
                <p className="font-semibold truncate text-sm">{title}</p>
                {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
            </div>
            <div className="font-bold text-right">{value}</div>
        </div>
    );
};
