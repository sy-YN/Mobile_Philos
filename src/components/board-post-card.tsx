'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import type { Post } from '@/app/actions';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, AlertTriangle, MessageSquare, MoreVertical, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import type { Timestamp } from "firebase/firestore";
import { doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useFirestore } from '@/firebase';
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BoardReplyCard } from "./board-reply-card";
import { deleteDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';

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
  if (typeof dateValue === 'object' && 'toDate' in dateValue) {
    date = (dateValue as Timestamp).toDate();
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
  const [areRepliesOpen, setAreRepliesOpen] = useState(false);
  const { firestore } = useFirestore();
  
  // Using a mock user ID until auth is implemented
  const currentUserId = 'mock-user-id';
  const [isLiked, setIsLiked] = useState(post.likedBy?.includes(currentUserId) || false);

  useEffect(() => {
    setIsLiked(post.likedBy?.includes(currentUserId) || false);
  }, [post.likedBy, currentUserId]);


  const needsModeration = post.analysis?.requiresModeration;

  const handleLike = async () => {
    if (!firestore) return;
    const postRef = doc(firestore, "posts", post.id);
    const updateData = {
      likes: post.likes + (isLiked ? -1 : 1),
      likedBy: isLiked ? arrayRemove(currentUserId) : arrayUnion(currentUserId)
    };

    updateDocumentNonBlocking(postRef, updateData);
    setIsLiked(!isLiked);
  };


  const handleUpdatePost = async () => {
    if (!firestore) return;
    if (!editedContent.trim()) {
      toast({
        title: "エラー",
        description: '内容は1文字以上で入力してください。',
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    const postRef = doc(firestore, "posts", post.id);
    updateDocumentNonBlocking(postRef, { content: editedContent });
    setIsSubmitting(false);
    setIsEditing(false);
    onUpdateSuccess?.();
  };

  const handleDeletePost = async () => {
    if (!firestore) return;
    setIsSubmitting(true);
    const postRef = doc(firestore, "posts", post.id);
    deleteDocumentNonBlocking(postRef);
    setIsSubmitting(false);
    onDeleteSuccess?.();
  };

  return (
    <Card className={cn("p-4 transition-all relative", needsModeration && "border-yellow-500/50 bg-yellow-500/5")}>
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
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-card-foreground">{post.author}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">投稿メニュー</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditing(true)} disabled={isSubmitting}>
                  編集
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
            <span className="text-xs text-muted-foreground ml-auto">{getTimeAgo(post.createdAt)}</span>
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
                <Button onClick={handleUpdatePost} disabled={isSubmitting}>
                  送信
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground dark:text-gray-300 mb-3">{post.content}</p>
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

              <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                <Button variant="ghost" size="sm" className="flex items-center gap-1.5 h-auto px-2 py-1 hover:text-primary flex-shrink-0" onClick={handleLike}>
                  <Heart className={cn("h-4 w-4", isLiked && "text-red-500 fill-current")} />
                  <span>{post.likes}</span>
                </Button>
                {isExecutive && (
                  <Button variant="ghost" size="sm" className={cn("flex items-center gap-1.5 h-auto px-2 py-1 flex-shrink-0", isReplying ? "text-primary" : "hover:text-primary")} onClick={onReplyClick}>
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
        <Collapsible open={areRepliesOpen} onOpenChange={setAreRepliesOpen} className="mt-4">
          <CollapsibleTrigger asChild>
             <div className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-primary pl-12">
              <div className="h-px w-6 bg-border"></div>
              <span>{post.replies.length}件の返信</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", areRepliesOpen && "rotate-180")} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-3 pl-12 space-y-3 border-l ml-15 pt-3">
              {post.replies.map((reply) => (
                <div key={reply.id}>
                  <BoardReplyCard 
                    reply={reply} 
                    post={post}
                  />
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </Card>
  );
}
