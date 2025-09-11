
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function OtherTab() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-foreground font-headline">Other</h2>
      <div className="space-y-3">
        <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
          <CardTitle className="text-base mb-1">Settings</CardTitle>
          <CardDescription className="text-sm">Change app settings</CardDescription>
        </Card>
        <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
          <CardTitle className="text-base mb-1">Help</CardTitle>
          <CardDescription className="text-sm">How-to guides and FAQs</CardDescription>
        </Card>
        <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
          <CardTitle className="text-base mb-1">Feedback</CardTitle>
          <CardDescription className="text-sm">Help us improve the app</CardDescription>
        </Card>
      </div>
    </div>
  );
}
