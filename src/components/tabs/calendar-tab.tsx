
'use client';

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

export function CalendarTab() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-foreground font-headline">カレンダー</h2>
      <Card>
        <CardContent className="p-2 flex justify-center">
          <Calendar
            mode="single"
            className="rounded-md"
          />
        </CardContent>
      </Card>
      {/* Add more calendar related content here if needed */}
    </div>
  );
}
