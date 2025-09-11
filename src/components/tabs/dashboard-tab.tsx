
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function DashboardTab() {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-semibold text-foreground font-headline">Dashboard</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Engagement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Active Users</span>
            <span className="font-medium text-primary">156</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Posts</span>
            <span className="font-medium text-primary">24</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Comments</span>
            <span className="font-medium text-primary">89</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">This Month's Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">Participation Rate</span>
              <span className="font-semibold text-primary">89%</span>
            </div>
            <Progress value={89} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">Satisfaction Score</span>
              <span className="font-semibold text-primary">92%</span>
            </div>
            <Progress value={92} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
