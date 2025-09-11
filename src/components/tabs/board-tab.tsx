
'use client';

import { useState, useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const philosophyItems = [
  {
    id: "mission",
    title: "私たちの使命",
    content: "組織のすべての個人が最大限の可能性を発揮し、集団的な成功を推進できるようにすること。",
  },
  {
    id: "vision",
    title: "私たちのビジョン",
    content: "すべての声が聞かれ、評価される、継続的な改善、革新、協業の文化を創造すること。",
  },
];

const valuesItems = [
  {
    id: "value-1",
    title: "1. エンパワーメント",
    content: "社員一人ひとりが自律的に行動し、意思決定できる権限と責任を持つことを奨励します。",
  },
  {
    id: "value-2",
    title: "2. 透明性",
    content: "情報をオープンに共有し、組織の意思決定プロセスを明確にすることで、信頼と誠実さを築きます。",
  },
  {
    id: "value-3",
    title: "3. 協業",
    content: "チームや部門の垣根を越えて協力し、多様な視点を活かして共通の目標を達成します。",
  },
  {
    id: "value-4",
    title: "4. 成長",
    content: "継続的な学習と挑戦を支援し、個人と組織が共に成長できる環境を提供します。",
  },
  {
    id: "value-5",
    title: "5. 包括性",
    content: "あらゆる背景を持つ人々を尊重し、誰もが自分らしく貢献できる、公平でインクルーシブな職場を目指します。",
  },
];


export function BoardTab() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPhilosophyItems = useMemo(() => {
    if (!searchTerm) return philosophyItems;
    return philosophyItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredValuesItems = useMemo(() => {
    if (!searchTerm) return valuesItems;
    return valuesItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const openAccordionItems = useMemo(() => {
    if (!searchTerm) return ["mission", "vision", "values"];
    
    const openItems = new Set<string>();

    if (filteredPhilosophyItems.length > 0) {
      filteredPhilosophyItems.forEach(item => openItems.add(item.id));
    }
    
    if (filteredValuesItems.length > 0) {
      openItems.add("values");
      filteredValuesItems.forEach(item => openItems.add(item.id));
    }

    return Array.from(openItems);
  }, [searchTerm, filteredPhilosophyItems, filteredValuesItems]);


  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-foreground font-headline mb-4">企業理念</h2>

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

      <Accordion type="multiple" value={openAccordionItems} className="w-full">
        {filteredPhilosophyItems.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-base font-medium hover:no-underline">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="whitespace-pre-line text-sm text-muted-foreground pt-2 pb-4 px-4">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}

        {(filteredValuesItems.length > 0 || !searchTerm) && (
          <AccordionItem value="values">
            <AccordionTrigger className="text-base font-medium hover:no-underline">
              私たちの価値観
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 px-2">
              <Accordion type="multiple" value={openAccordionItems} className="w-full space-y-1">
                {filteredValuesItems.map((valueItem) => (
                  <AccordionItem key={valueItem.id} value={valueItem.id} className="border-none">
                     <Card className="bg-muted/50">
                      <AccordionTrigger className="text-sm font-medium hover:no-underline p-4 text-left">
                        {valueItem.title}
                      </AccordionTrigger>
                      <AccordionContent className="whitespace-pre-line text-sm text-muted-foreground pt-0 pb-4 px-4">
                        {valueItem.content}
                      </AccordionContent>
                     </Card>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
      
      {searchTerm && filteredPhilosophyItems.length === 0 && filteredValuesItems.length === 0 && (
        <div className="text-center text-muted-foreground mt-8">
          <p>「{searchTerm}」に一致する結果は見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
}
