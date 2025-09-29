
'use client';

import Image from "next/image";
import { useState } from "react";
import type { Post, Reply } from '@/app/actions';
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Timestamp, doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type BoardReplyCardProps = {
  reply: Reply;
  post: Post;
  // onUpdateSuccess is implicitly handled by onSnapshot in parent
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

export function BoardReplyCard({ reply, post }: BoardReplyCardProps) {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(reply.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateReply = async () => {
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
      const updatedReply = { ...reply, content: editedContent };

      // To update an item in an array, we remove the old one and add the new one.
      // This is a common pattern for array updates in Firestore.
      const currentReplies = post.replies || [];
      const updatedReplies = currentReplies.map(r => r.id === reply.id ? updatedReply : r);

      await updateDoc(postRef, {
        replies: updatedReplies
      });

      toast({
        title: "成功",
        description: "返信が正常に更新されました。",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating reply:", error);
      toast({
        title: "エラー",
        description: "返信の更新中にエラーが発生しました。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReply = async () => {
    setIsSubmitting(true);
    try {
      const postRef = doc(db, "posts", post.id);
      // We pass the entire reply object to arrayRemove to ensure Firestore can find and delete it.
      await updateDoc(postRef, {
        replies: arrayRemove(reply)
      });
      toast({
        title: "成功",
        description: "返信が正常に削除されました。",
      });
    } catch (error) {
      console.error("Error deleting reply:", error);
      toast({
        title: "エラー",
        description: "返信の削除中にエラーが発生しました。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-start gap-3 relative group">
      <Image
        src={reply.avatar}
        alt={reply.author}
        width={32}
        height={32}
        className="rounded-full mt-1"
        data-ai-hint="person portrait"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-sm text-card-foreground">{reply.author}</span>
          <span className="text-xs text-muted-foreground">{getTimeAgo(reply.createdAt)}</span>
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
          <p className="text-sm text-muted-foreground">{reply.content}</p>
        )}
      </div>

      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">返信メニュー</span>
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
      </div>
    </div>
  );
}
