
'use client';
import { Award, BarChart, Heart, MessageSquare, Target, Trophy, Crown, Users, BookOpen, Medal, Star, Film, Megaphone, Building } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Separator } from '../ui/separator';

const departments = [
    { id: 'all', name: '全社' },
    { id: 'sales', name: '営業部' },
    { id: 'development', name: '開発部' },
    { id: 'marketing', name: 'マーケティング部' },
    { id: 'hr', name: '人事部' },
    { id: 'design', name: 'デザイン部' },
];

// --- Expanded Dummy Data ---
const individualMvpRanking = [
    { id: 1, name: '山田 太郎', avatar: 'https://picsum.photos/seed/p1/100/100', score: 98.5, department: 'sales' },
    { id: 2, name: '渡辺 久美子', avatar: 'https://picsum.photos/seed/p4/100/100', score: 95.2, department: 'development' },
    { id: 3, name: '田中 雄大', avatar: 'https://picsum.photos/seed/p5/100/100', score: 92.8, department: 'sales' },
    { id: 4, name: '伊藤 健太', avatar: 'https://picsum.photos/seed/p3/100/100', score: 91.5, department: 'marketing' },
    { id: 5, name: '佐藤 あきら', avatar: 'https://picsum.photos/seed/p6/100/100', score: 89.9, department: 'development' },
    { id: 6, name: '鈴木 花子', avatar: 'https://picsum.photos/seed/p2/100/100', score: 88.1, department: 'hr' },
    { id: 7, name: '高橋 直人', avatar: 'https://picsum.photos/seed/p7/100/100', score: 87.5, department: 'design' },
    { id: 8, name: '中村 美咲', avatar: 'https://picsum.photos/seed/p8/100/100', score: 86.2, department: 'sales' },
    { id: 9, name: '小林 誠', avatar: 'https://picsum.photos/seed/p9/100/100', score: 85.0, department: 'marketing' },
    { id: 10, name: '加藤 愛', avatar: 'https://picsum.photos/seed/p10/100/100', score: 84.3, department: 'development' },
    { id: 11, name: '吉田 健一', avatar: 'https://picsum.photos/seed/p11/100/100', score: 82.1, department: 'hr' },
    { id: 12, name: '山本 詩織', avatar: 'https://picsum.photos/seed/p12/100/100', score: 80.4, department: 'design' },
];

const individualLikesRanking = [
    { id: 1, name: '伊藤 健太', avatar: 'https://picsum.photos/seed/p3/100/100', likes: 152, department: 'marketing' },
    { id: 2, name: '山田 太郎', avatar: 'https://picsum.photos/seed/p1/100/100', likes: 148, department: 'sales' },
    { id: 3, name: '佐藤 あきら', avatar: 'https://picsum.photos/seed/p6/100/100', likes: 121, department: 'development' },
    { id: 4, name: '鈴木 花子', avatar: 'https://picsum.photos/seed/p2/100/100', likes: 115, department: 'hr' },
    { id: 5, name: '渡辺 久美子', avatar: 'https://picsum.photos/seed/p4/100/100', likes: 102, department: 'development' },
    { id: 6, name: '田中 雄大', avatar: 'https://picsum.photos/seed/p5/100/100', likes: 99, department: 'sales' },
    { id: 7, name: '高橋 直人', avatar: 'https://picsum.photos/seed/p7/100/100', likes: 95, department: 'design' },
    { id: 8, name: '中村 美咲', avatar: 'https://picsum.photos/seed/p8/100/100', likes: 91, department: 'sales' },
    { id: 9, name: '小林 誠', avatar: 'https://picsum.photos/seed/p9/100/100', likes: 88, department: 'marketing' },
    { id: 10, name: '加藤 愛', avatar: 'https://picsum.photos/seed/p10/100/100', likes: 85, department: 'development' },
];

const individualCommentsRanking = [
    { id: 1, name: '佐藤 あきら', avatar: 'https://picsum.photos/seed/p6/100/100', comments: 78, department: 'development' },
    { id: 2, name: '鈴木 花子', avatar: 'https://picsum.photos/seed/p2/100/100', comments: 65, department: 'hr' },
    { id: 3, name: '山田 太郎', avatar: 'https://picsum.photos/seed/p1/100/100', comments: 59, department: 'sales' },
    { id: 4, name: '伊藤 健太', avatar: 'https://picsum.photos/seed/p3/100/100', comments: 52, department: 'marketing' },
    { id: 5, name: '田中 雄大', avatar: 'https://picsum.photos/seed/p5/100/100', comments: 45, department: 'sales' },
    { id: 6, name: '渡辺 久美子', avatar: 'https://picsum.photos/seed/p4/100/100', comments: 41, department: 'development' },
    { id: 7, name: '加藤 愛', avatar: 'https://picsum.photos/seed/p10/100/100', comments: 39, department: 'development' },
    { id: 8, name: '高橋 直人', avatar: 'https://picsum.photos/seed/p7/100/100', comments: 35, department: 'design' },
    { id: 9, name: '吉田 健一', avatar: 'https://picsum.photos/seed/p11/100/100', comments: 33, department: 'hr' },
    { id: 10, name: '小林 誠', avatar: 'https://picsum.photos/seed/p9/100/100', comments: 28, department: 'marketing' },
];

const departmentAchievementRanking = [
    { id: 1, name: '営業部', progress: 115 },
    { id: 2, name: '開発部', progress: 98 },
    { id: 3, name: 'マーケティング部', progress: 92 },
    { id: 4, name: 'デザイン部', progress: 90 },
    { id: 5, name: '人事部', progress: 88 },
    { id: 6, name: '広報部', progress: 85 },
    { id: 7, name: '経理部', progress: 82 },
];

const totalEmployees = 1550;

const shortVideoRanking = [
    { id: 1, title: '第4四半期 全社ミーティング', viewers: 1280, totalAudience: totalEmployees },
    { id: 2, title: '新プロダクトのコンセプト紹介', viewers: 980, totalAudience: totalEmployees },
    { id: 3, title: 'ベータ版新機能のデモ', viewers: 750, totalAudience: totalEmployees },
    { id: 4, title: 'コンプライアンス研修', viewers: 680, totalAudience: totalEmployees },
    { id: 5, title: '新入社員紹介', viewers: 650, totalAudience: totalEmployees },
    { id: 6, title: '健康経営セミナー', viewers: 540, totalAudience: totalEmployees },
];

const executiveMessageRanking = [
    { id: 1, title: '第4四半期の戦略 (CEO)', viewers: 1520, totalAudience: totalEmployees },
    { id: 2, title: 'DX推進の進捗 (CTO)', viewers: 1100, totalAudience: totalEmployees },
    { id: 3, title: '新市場への展開について', viewers: 850, totalAudience: totalEmployees },
    { id: 4, title: 'サステナビリティ活動報告', viewers: 780, totalAudience: totalEmployees },
    { id: 5, title: '従業員満足度調査の結果', viewers: 720, totalAudience: totalEmployees },
    { id: 6, title: 'ダイバーシティ＆インクルージョン', viewers: 680, totalAudience: totalEmployees },
];

// --- Pagination Component ---
const PaginatedRankingList = ({ items, renderItem, itemsPerPage = 5 }: { items: any[], renderItem: (item: any, index: number) => React.ReactNode, itemsPerPage?: number }) => {
    const [currentPage, setCurrentPage] = useState(0);

    React.useEffect(() => {
        setCurrentPage(0);
    }, [items]);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);
    
    const paginatedRenderItem = (item: any, index: number) => renderItem(item, startIndex + index);

    if (items.length === 0) {
        return <p className="text-sm text-muted-foreground text-center py-4">該当するデータがありません。</p>;
    }

    return (
        <div>
            <div className="space-y-3">
                {paginatedItems.map(paginatedRenderItem)}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentPage(p => p - 1)} 
                        disabled={currentPage === 0}
                    >
                        前の{itemsPerPage}件
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        ページ {currentPage + 1} / {totalPages}
                    </span>
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentPage(p => p + 1)} 
                        disabled={currentPage >= totalPages - 1}
                    >
                        次の{itemsPerPage}件
                    </Button>
                </div>
            )}
        </div>
    );
};

const TopNAndSelfRankingList = ({ items, renderItem, selfName }: { items: any[], renderItem: (item: any, index: number, isSelf: boolean) => React.ReactNode, selfName: string }) => {
    const top3 = items.slice(0, 3);
    const selfIndex = items.findIndex(item => item.name === selfName);
    const selfData = selfIndex !== -1 ? items[selfIndex] : null;
    const isSelfInTop3 = selfIndex !== -1 && selfIndex < 3;

    return (
        <div className="space-y-3">
            {top3.map((item, index) => renderItem(item, index, item.name === selfName))}
            {selfData && !isSelfInTop3 && (
                <>
                    <div className="flex items-center gap-4 py-2">
                        <Separator className="flex-1" />
                        <span className="text-xs text-muted-foreground">あなたの順位</span>
                        <Separator className="flex-1" />
                    </div>
                    {renderItem(selfData, selfIndex, true)}
                </>
            )}
        </div>
    );
};


export function RankingTab() {
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    // In a real app, this would come from auth.
    const currentUserName = '鈴木 花子';

    const getFilteredData = (data: any[]) => {
        if (selectedDepartment === 'all') return data;
        return data.filter(item => item.department === selectedDepartment);
    }

    return (
        <div className="h-full overflow-y-auto">
            <div className="p-4">
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
                    <div className="flex-grow mt-4">
                        <div className="pr-4">
                            <TabsContent value="individual" className="space-y-6 m-0">
                                <div className="flex items-center gap-4 mb-4">
                                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                                        <SelectTrigger className="w-[180px]">
                                            <Building className="h-4 w-4 mr-2 text-muted-foreground"/>
                                            <SelectValue placeholder="部署を選択" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {departments.map(dep => (
                                                <SelectItem key={dep.id} value={dep.id}>{dep.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <Award className="text-yellow-500" />
                                            個人MVP
                                        </CardTitle>
                                        <CardDescription>目標達成、理念体現などを総合評価</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                    <TopNAndSelfRankingList 
                                            items={getFilteredData(individualMvpRanking)}
                                            selfName={currentUserName}
                                            renderItem={(item, index, isSelf) => (
                                                <RankingListItem 
                                                    key={item.id} 
                                                    index={index}
                                                    avatar={item.avatar}
                                                    title={item.name} 
                                                    value={`${item.score} pt`}
                                                    isSelf={isSelf}
                                                />
                                            )}
                                        />
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
                                        <TopNAndSelfRankingList 
                                            items={getFilteredData(individualLikesRanking)}
                                            selfName={currentUserName}
                                            renderItem={(item, index, isSelf) => (
                                                <RankingListItem 
                                                    key={item.id} 
                                                    index={index} 
                                                    avatar={item.avatar}
                                                    title={item.name}
                                                    value={`${item.likes} いいね`}
                                                    isSelf={isSelf}
                                                />
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                                
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <MessageSquare className="text-green-500" />
                                            コメント投稿数
                                        </CardTitle>
                                        <CardDescription>掲示板への投稿と返信の総数</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <TopNAndSelfRankingList 
                                            items={getFilteredData(individualCommentsRanking)}
                                            selfName={currentUserName}
                                            renderItem={(item, index, isSelf) => (
                                                <RankingListItem 
                                                    key={item.id} 
                                                    index={index} 
                                                    avatar={item.avatar}
                                                    title={item.name}
                                                    value={`${item.comments} 回`}
                                                    isSelf={isSelf}
                                                />
                                            )}
                                        />
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
                                        <PaginatedRankingList 
                                            items={departmentAchievementRanking}
                                            renderItem={(item, index) => (
                                                <RankingListItem
                                                    key={item.id}
                                                    index={index}
                                                    title={item.name}
                                                    value={`${item.progress}%`}
                                                />
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                        <Film className="text-purple-500" />
                                        ショート動画 視聴率
                                        </CardTitle>
                                        <CardDescription>社内向けショート動画の視聴率</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <PaginatedRankingList 
                                            items={shortVideoRanking}
                                            renderItem={(item, index) => (
                                                <RankingListItem
                                                    key={item.id}
                                                    index={index}
                                                    title={item.title}
                                                    value={`${item.viewers} / ${item.totalAudience} 人`}
                                                />
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                        <Megaphone className="text-orange-500" />
                                        経営層メッセージ 閲覧率
                                        </CardTitle>
                                        <CardDescription>経営層からのメッセージの閲覧率</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <PaginatedRankingList 
                                            items={executiveMessageRanking}
                                            renderItem={(item, index) => (
                                                <RankingListItem
                                                    key={item.id}
                                                    index={index}
                                                    title={item.title}
                                                    value={`${item.viewers} / ${item.totalAudience} 人`}
                                                />
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}

const RankingListItem = ({ index, avatar, title, subtitle, value, isSelf }: { index: number; avatar?: string; title: string; subtitle?: string; value: string; isSelf?: boolean; }) => {
    const rankIcons = [
        <Crown key="1" className="text-yellow-400 fill-yellow-400" />,
        <Medal key="2" className="text-gray-400 fill-gray-400" />,
        <Star key="3" className="text-yellow-700 fill-yellow-700" />
    ];
    
    return (
        <div className={cn("flex items-center gap-4 p-2 rounded-lg transition-colors", isSelf ? "bg-primary/10 border border-primary/50" : "hover:bg-muted/50")}>
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
