
'use client';

import { useState, useEffect } from 'react';
import { philosophyItems, valuesItems } from '@/lib/company-philosophy';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, Star, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function PhilosophyTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPhilosophyItems, setFilteredPhilosophyItems] = useState(philosophyItems);
  const [filteredValuesItems, setFilteredValuesItems] = useState(valuesItems);
  const [activeAccordion, setActiveAccordion] = useState<string[]>([]);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();

    const filteredPhilosophy = philosophyItems.filter(item =>
      item.title.toLowerCase().includes(lowercasedFilter) ||
      item.content.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredPhilosophyItems(filteredPhilosophy);

    const filteredValues = valuesItems.filter(item =>
      item.title.toLowerCase().includes(lowercasedFilter) ||
      item.content.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredValuesItems(filteredValues);

    if (searchTerm) {
      const philosophyIds = filteredPhilosophy.map(item => item.id);
      const valuesIds = filteredValues.map(item => item.id);
      setActiveAccordion([...philosophyIds, ...valuesIds]);
    } else {
      setActiveAccordion([]);
    }
  }, [searchTerm]);

  return (
    <div className="p-4 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="理念や価値観を検索..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground font-headline mb-4">企業理念</h2>
        <Accordion type="multiple" value={searchTerm ? activeAccordion : ['mission', 'vision']} onValueChange={setActiveAccordion} className="w-full space-y-4">
          {filteredPhilosophyItems.map(item => (
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
        {filteredPhilosophyItems.length === 0 && (
          <p className="text-sm text-muted-foreground text-center pt-4">該当する項目はありません。</p>
        )}
      </div>

      <div>
        <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          私たちの価値観 (Values)
        </h3>
        <Accordion type="multiple" value={activeAccordion} onValueChange={setActiveAccordion} className="w-full space-y-2">
           {filteredValuesItems.map(item => (
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
        {filteredValuesItems.length === 0 && searchTerm && (
          <p className="text-sm text-muted-foreground text-center pt-4">該当する項目はありません。</p>
        )}
      </div>
    </div>
  );
}
