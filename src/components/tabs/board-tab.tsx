
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
  {
    id: "values",
    title: "私たちの価値観",
    content: "1. エンパワーメント\n2. 透明性\n3. 協業\n4. 成長\n5. 包括性",
  },
];

export function BoardTab() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-foreground font-headline mb-4">企業理念</h2>
      <Accordion type="multiple" defaultValue={["mission", "vision", "values"]} className="w-full">
        {philosophyItems.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-base font-medium hover:no-underline">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="whitespace-pre-line text-sm text-muted-foreground pt-2 pb-4 px-4">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
