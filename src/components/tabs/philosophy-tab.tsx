
'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { philosophyItems, valuesItems } from '@/lib/company-philosophy';
import { BookOpen, Gem, Search } from 'lucide-react';

export function PhilosophyTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeAccordion, setActiveAccordion] = useState<string[]>([]);

  const filteredPhilosophy = philosophyItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredValues = valuesItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term) {
      const allFilteredIds = [
        ...filteredPhilosophy.map(item => item.id),
        ...filteredValues.map(item => item.id)
      ];
      setActiveAccordion(allFilteredIds);
    } else {
      setActiveAccordion([]);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="理念を検索..."
          className="pl-10"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          企業理念
        </h2>
        <Card>
          <CardContent className="p-0">
            <Accordion type="multiple" value={activeAccordion} onValueChange={setActiveAccordion}>
              {filteredPhilosophy.map((item) => (
                <AccordionItem value={item.id} key={item.id}>
                  <AccordionTrigger className="px-6 text-base hover:no-underline">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="whitespace-pre-line text-muted-foreground leading-relaxed">{item.content}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Gem className="h-5 w-5 text-primary" />
          私たちの価値観
        </h2>
        <Card>
          <CardContent className="p-0">
            <Accordion type="multiple" value={activeAccordion} onValueChange={setActiveAccordion}>
              {filteredValues.map((item) => (
                <AccordionItem value={item.id} key={item.id}>
                  <AccordionTrigger className="px-6 text-base hover:no-underline">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                     <p className="whitespace-pre-line text-muted-foreground leading-relaxed">{item.content}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
