
'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { philosophyItems, valuesItems } from '@/lib/company-philosophy';
import { BookOpen, Search } from 'lucide-react';

type PhilosophyItem = {
  id: string;
  title: string;
  content: string;
};

function PhilosophySection({ title, items, openItems, onToggle, searchTerm }: { title: string, items: PhilosophyItem[], openItems: string[], onToggle: (id: string) => void, searchTerm: string }) {
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (searchTerm && filteredItems.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        {title}
      </h2>
      <Accordion type="multiple" value={searchTerm ? filteredItems.map(item => item.id) : openItems} onValueChange={values => !searchTerm && values.forEach(onToggle)}>
        {(searchTerm ? filteredItems : items).map(item => (
          <AccordionItem value={item.id} key={item.id}>
            <AccordionTrigger onClick={() => !searchTerm && onToggle(item.id)}>{item.title}</AccordionTrigger>
            <AccordionContent>
              <p className="text-base leading-relaxed text-muted-foreground">{item.content}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function PhilosophyTab() {
  const [openItems, setOpenItems] = useState<string[]>(['mission']);
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggle = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="企業理念を検索..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm &&
        !philosophyItems.some(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !valuesItems.some(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
         (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">「{searchTerm}」に一致する結果は見つかりませんでした。</p>
            </CardContent>
          </Card>
        )
      }

      <PhilosophySection 
        title="企業理念" 
        items={philosophyItems} 
        openItems={openItems}
        onToggle={handleToggle}
        searchTerm={searchTerm}
      />
      <PhilosophySection 
        title="私たちの価値観" 
        items={valuesItems}
        openItems={openItems}
        onToggle={handleToggle}
        searchTerm={searchTerm}
      />
    </div>
  );
}
