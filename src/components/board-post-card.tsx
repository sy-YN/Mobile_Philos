
'use client';

import Image from "next/image";
import { useState } from "react";
import type { Post } from '@/app/actions';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, AlertTriangle, MessageSquare, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Timestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '@/lib/firebase';
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BoardReplyCard } from "./board-reply-card";


type BoardPostCardProps = {
  post: Post;
  isExecutive?: boolean;
  onReplyClick?: () => void;
  isReplying?: boolean;
  onUpdateSuccess?: () => void;
  onDeleteSuccess?: () => void;
};

const getTimeAgo = (dateValue: string | Date | Timestamp) => {
  if (!dateValue) return 'たった今';
  let date;
  if (dateValue instanceof Timestamp) {
    date = dateValue.toDate();
  } else if (dateValue instanceof Date) {
    date = dateValue;
  } else if (typeof dateValue === 'string') {
    date = new Date(dateValue);
  } else {
    return '不明';
  }
  return formatDistanceToNow(date, { addSuffix: true, locale: ja });
}


export function BoardPostCard({ post, isExecutive, onReplyClick, isReplying, onUpdateSuccess, onDeleteSuccess }: BoardPostCardProps) {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const needsModeration = post.analysis?.requiresModeration;

  const handleUpdatePost = async () => {
    if (!editedContent.trim()) {
      toast({
        title: "エラー",
        description: '内容は1文字以上で入力してください。',
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const postRef = doc(db, "posts", post.id);
      await updateDoc(postRef, {
        content: editedContent,
      });
      toast({
        title: "成功",
        description: "投稿が正常に更新されました。",
      });
      setIsEditing(false);
      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast({
        title: "エラー",
        description: "投稿の更新中にエラーが発生しました。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async () => {
    setIsSubmitting(true);
    try {
      const postRef = doc(db, "posts", post.id);
      await deleteDoc(postRef);
      toast({
        title: "成功",
        description: "投稿が正常に削除されました。",
      });
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "エラー",
        description: "投稿の削除中にエラーが発生しました。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      // No need to close dialog here, it's handled by AlertDialog
    }
  };

  return (
    <Card className={cn("p-4 transition-all relative", needsModeration && "border-yellow-500/50 bg-yellow-500/5")}>
      <div className="absolute top-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">投稿メニュー</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditing(true)} disabled={isSubmitting}>
              更新
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="text-red-600 focus:text-red-600 cursor-pointer" 
                  disabled={isSubmitting}
                >
                  削除
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-xs">
                <AlertDialogHeader>
                  <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
                  <AlertDialogDescription>
                    この操作は元に戻せません。この投稿と全ての返信が完全に削除されます。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeletePost} className="bg-red-600 text-white hover:bg-red-700">
                    削除
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
            <span className="text-xs text-muted-foreground">{getTimeAgo(post.createdAt)}</span>
          </div>
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="ghost" onClick={() => {
                  setIsEditing(false);
                  setEditedContent(post.content);
                }} disabled={isSubmitting}>
                  キャンセル
                </Button>
                <Button onClick={handleUpdatePost} disabled={isSubmitting} className="bg-orange-500 hover:bg-orange-600 text-white">
                  送信
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mb-3">{post.content}</p>
          )}

          {!isEditing && (
            <>
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
                {isExecutive && (
                  <Button variant="ghost" size="sm" className={cn("flex items-center gap-1.5 h-auto px-2 py-1", isReplying ? "text-primary" : "hover:text-primary")} onClick={onReplyClick}>
                    <MessageSquare className="h-4 w-4" />
                    <span>返信する (経営陣のみ)</span>
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
       {post.replies && post.replies.length > 0 && (
        <div className="mt-4 pl-12 space-y-3 border-t pt-4">
          {post.replies.map((reply) => (
            <BoardReplyCard 
              key={reply.id} 
              reply={reply} 
              post={post}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
