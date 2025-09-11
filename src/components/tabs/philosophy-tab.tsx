
'use client';

import { philosophyItems, valuesItems } from '@/lib/company-philosophy';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, Star } from 'lucide-react';

export function PhilosophyTab() {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-semibold text-foreground font-headline">企業理念</h2>
      
      <Accordion type="multiple" defaultValue={['mission', 'vision']} className="w-full space-y-4">
        {philosophyItems.map(item => (
          <AccordionItem value={item.id} key={item.id} className="bg-card rounded-lg border">
             <AccordionTrigger className="px-6 py-4 text-base font-medium hover:no-underline">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-0">
              <p className="text-muted-foreground">{item.content}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div>
        <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          私たちの価値観 (Values)
        </h3>
        <Accordion type="multiple" className="w-full space-y-2">
           {valuesItems.map(item => (
            <AccordionItem value={item.id} key={item.id} className="bg-card rounded-lg border">
              <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-0">
                <p className="text-muted-foreground text-sm">{item.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
