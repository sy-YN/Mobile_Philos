
import Image from "next/image";
import type { Post } from '@/app/actions';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Timestamp } from "firebase/firestore";


type BoardPostCardProps = {
  post: Post;
};

export function BoardPostCard({ post }: BoardPostCardProps) {
  const needsModeration = post.analysis?.requiresModeration;

  const getTimeAgo = () => {
    if (!post.createdAt) return 'たった今';
    let date;
    if (post.createdAt instanceof Timestamp) {
      date = post.createdAt.toDate();
    } else if (post.createdAt instanceof Date) {
      date = post.createdAt;
    } else if (typeof post.createdAt === 'string') {
      date = new Date(post.createdAt);
    } else {
      return '不明';
    }
    return formatDistanceToNow(date, { addSuffix: true, locale: ja });
  }

  return (
    <Card className={cn("p-4 transition-all", needsModeration && "border-yellow-500/50 bg-yellow-500/5")}>
      <div className="flex items-start gap-3">
        <Image
          src={post.avatar}
          alt={post.author}
          width={40}
          height={40}
          className="rounded-full mt-1"
          data-ai-hint="person portrait"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-card-foreground">{post.author}</span>
            <span className="text-xs text-muted-foreground">{getTimeAgo()}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{post.content}</p>

          {needsModeration && (
            <div className="p-2 rounded-md bg-yellow-500/10 mb-3 text-xs text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <div>
                <span className="font-semibold">要レビュー:</span> {post.analysis?.sentiment}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Button variant="ghost" size="sm" className="flex items-center gap-1.5 h-auto px-2 py-1 hover:text-primary">
              <Heart className="h-4 w-4" />
              <span>{post.likes}</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
