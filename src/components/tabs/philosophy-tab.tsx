
'use client';

import { useState, useMemo } from 'react';
import { philosophyItems, valuesItems } from '@/lib/company-philosophy';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '../ui/card';

export function PhilosophyTab() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return { philosophy: [], values: [] };
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    const philosophy = philosophyItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lowercasedFilter) ||
        item.content.toLowerCase().includes(lowercasedFilter)
    );
    const values = valuesItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lowercasedFilter) ||
        item.content.toLowerCase().includes(lowercasedFilter)
    );
    return { philosophy, values };
  }, [searchTerm]);

  const hasSearchResults = filteredItems.philosophy.length > 0 || filteredItems.values.length > 0;

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <header className="flex items-center gap-2 mb-4 pt-2 shrink-0">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground font-headline">企業理念</h2>
        </header>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="理念を検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {searchTerm ? (
          <div className="space-y-4">
            {hasSearchResults ? (
              <>
                {filteredItems.philosophy.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground dark:text-gray-400">理念・ビジョン</h3>
                    {filteredItems.philosophy.map(item => (
                      <Card key={item.id} className="p-4">
                        <h4 className="font-semibold text-card-foreground mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground dark:text-gray-300">{item.content}</p>
                      </Card>
                    ))}
                  </div>
                )}
                {filteredItems.values.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground dark:text-gray-400">行動指針</h3>
                    {filteredItems.values.map(item => (
                      <Card key={item.id} className="p-4">
                        <div className="flex items-center gap-3 mb-1">
                          <item.icon className="w-5 h-5 text-primary" />
                          <h4 className="font-semibold text-card-foreground">{item.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground dark:text-gray-300 ml-8">{item.content}</p>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground dark:text-gray-400">「{searchTerm}」に一致する項目は見つかりませんでした。</p>
              </div>
            )}
          </div>
        ) : (
          <Accordion type="single" collapsible defaultValue="philosophy" className="w-full">
            <AccordionItem value="philosophy">
              <AccordionTrigger className="text-lg font-semibold dark:text-white">
                私たちの理念
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="multiple" className="w-full space-y-2">
                  <AccordionItem value="mission">
                    <AccordionTrigger className="bg-muted/50 px-4 rounded-md text-foreground">
                      {philosophyItems[0].title}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pt-2 text-muted-foreground dark:text-gray-300">
                      {philosophyItems[0].content}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="vision">
                    <AccordionTrigger className="bg-muted/50 px-4 rounded-md text-foreground">
                      {philosophyItems[1].title}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pt-2 text-muted-foreground dark:text-gray-300">
                      {philosophyItems[1].content}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="values">
                    <AccordionTrigger className="bg-muted/50 px-4 rounded-md text-foreground">
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
                            <p className="text-sm text-muted-foreground dark:text-gray-300 ml-8">
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
        )}
      </div>
    </div>
  );
}
