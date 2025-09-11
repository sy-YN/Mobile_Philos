
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
        <AccordionItem value="values">
          <AccordionTrigger className="text-base font-medium hover:no-underline">
            私たちの価値観
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 px-2">
            <Accordion type="multiple" className="w-full space-y-1">
              {valuesItems.map((valueItem) => (
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
      </Accordion>
    </div>
  );
}
