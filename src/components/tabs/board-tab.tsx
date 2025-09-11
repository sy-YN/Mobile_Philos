
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
    title: "Our Mission",
    content: "To empower every individual in the organization to reach their full potential and drive collective success.",
  },
  {
    id: "vision",
    title: "Our Vision",
    content: "To create a culture of continuous improvement, innovation, and collaboration, where every voice is heard and valued.",
  },
  {
    id: "values",
    title: "Our Values",
    content: "1. Empowerment\n2. Transparency\n3. Collaboration\n4. Growth\n5. Inclusivity",
  },
];

export function BoardTab() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-foreground font-headline mb-4">Company Philosophy</h2>
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
