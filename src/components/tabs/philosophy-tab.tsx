
'use client';

import { philosophyItems, valuesItems } from '@/lib/company-philosophy';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen } from 'lucide-react';

export function PhilosophyTab() {
  return (
    <div className="p-4">
      <header className="flex items-center gap-2 mb-6 pt-2 shrink-0">
        <BookOpen className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold text-foreground font-headline">企業理念</h2>
      </header>

      <Accordion type="single" collapsible defaultValue="philosophy" className="w-full">
        <AccordionItem value="philosophy">
          <AccordionTrigger className="text-lg font-semibold">
            私たちの理念
          </AccordionTrigger>
          <AccordionContent>
            
            <Accordion type="multiple" className="w-full space-y-2">
              <AccordionItem value="mission">
                <AccordionTrigger className="bg-muted/50 px-4 rounded-md">
                  {philosophyItems[0].title}
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 text-muted-foreground">
                  {philosophyItems[0].content}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="vision">
                <AccordionTrigger className="bg-muted/50 px-4 rounded-md">
                  {philosophyItems[1].title}
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 text-muted-foreground">
                  {philosophyItems[1].content}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="values">
                <AccordionTrigger className="bg-muted/50 px-4 rounded-md">
                  行動指針
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="space-y-4 p-4 border rounded-md">
                    {valuesItems.map(item => (
                      <div key={item.id}>
                        <div className="flex items-center gap-3 mb-1">
                          <item.icon className="w-5 h-5 text-primary" />
                          <h4 className="font-semibold text-card-foreground">{item.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground ml-8">
                          {item.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>

          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
