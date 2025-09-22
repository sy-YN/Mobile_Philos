
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type OtherTabProps = {
  isDarkMode: boolean;
  onDarkModeChange: (enabled: boolean) => void;
};

export function OtherTab({ isDarkMode, onDarkModeChange }: OtherTabProps) {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-foreground font-headline">その他</h2>
      <div className="space-y-3">
        <Dialog>
          <DialogTrigger asChild>
            <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <CardTitle className="text-base mb-1">設定</CardTitle>
              <CardDescription className="text-sm">アプリの設定を変更します</CardDescription>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-xs">
            <DialogHeader>
              <DialogTitle>設定</DialogTitle>
              <DialogDescription>
                アプリの表示設定などを変更します。
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode-switch" className="text-base">
                  ダークモード
                </Label>
                <Switch
                  id="dark-mode-switch"
                  checked={isDarkMode}
                  onCheckedChange={onDarkModeChange}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
          <CardTitle className="text-base mb-1">ヘルプ</CardTitle>
          <CardDescription className="text-sm">使い方ガイドとFAQ</CardDescription>
        </Card>
        <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
          <CardTitle className="text-base mb-1">フィードバック</CardTitle>
          <CardDescription className="text-sm">アプリの改善にご協力ください</CardDescription>
        </Card>
      </div>
    </div>
  );
}
