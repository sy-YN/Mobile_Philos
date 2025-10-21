'use client';

import Image from "next/image";
import { useState } from "react";
import type { Post, Reply } from '@/app/actions';
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import type { Timestamp } from "firebase/firestore";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { useFirestore } from '@/firebase/provider';
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
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';

type BoardReplyCardProps = {
  reply: Reply;
  post: Post;
  // onUpdateSuccess is implicitly handled by onSnapshot in parent
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

export function BoardReplyCard({ reply, post }: BoardReplyCardProps) {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(reply.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();

  const handleUpdateReply = async () => {
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
    const updatedReplies = post.replies?.map(r => 
        r.id === reply.id ? { ...r, content: editedContent } : r
    );
    updateDocumentNonBlocking(postRef, { replies: updatedReplies });

    setIsSubmitting(false);
    setIsEditing(false);
  };

  const handleDeleteReply = async () => {
    if (!firestore) return;
    setIsSubmitting(true);
    const postRef = doc(firestore, "posts", post.id);
    updateDocumentNonBlocking(postRef, { replies: arrayRemove(reply) });
    setIsSubmitting(false);
  };

  return (
    <div className="flex items-start gap-3">
      <Image
        src={reply.avatar}
        alt={reply.author}
        width={32}
        height={32}
        className="rounded-full mt-1"
        data-ai-hint="person portrait"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-card-foreground">{reply.author}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">返信メニュー</span>
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
                    <AlertDialogTitle>本当にこの返信を削除しますか？</AlertDialogTitle>
                    <AlertDialogDescription>
                      この操作は元に戻せません。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteReply} className="bg-red-600 text-white hover:bg-red-700">
                      削除
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="text-xs text-muted-foreground ml-auto">{getTimeAgo(reply.createdAt)}</span>
        </div>
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[60px] text-sm"
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="ghost" size="sm" onClick={() => {
                setIsEditing(false);
                setEditedContent(reply.content);
              }} disabled={isSubmitting}>
                キャンセル
              </Button>
              <Button onClick={handleUpdateReply} size="sm" disabled={isSubmitting} className="bg-orange-500 hover:bg-orange-600 text-white">
                送信
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground dark:text-gray-300">{reply.content}</p>
        )}
      </div>
    </div>
  );
}
