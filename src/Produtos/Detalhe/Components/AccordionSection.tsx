import Image from "next/image";

import { AccordionSectionProps } from "../types";

export default function AccordionSection(props: AccordionSectionProps) {
  const { accordionItems, openIndex, handleToggle } = props;

  return (
    <div className="px-4 sm:px-6 py-3">
      {accordionItems.map((accordionItem, index) => (
        <div key={accordionItem.title} className="border-b border-black">
          <button
            className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-sm text-zinc-900"
            onClick={() => handleToggle(index)}
          >
            {accordionItem.title}
            <span className="text-lg font-light">{openIndex === index ? "-" : "+"}</span>
          </button>

          {openIndex === index && (
            <div className="pb-4">
              <div
                className="text-sm text-zinc-600
                  [&_p]:mt-4 [&_p]:mb-2 [&_p]:font-medium [&_p]:text-zinc-900 [&_p:first-child]:mt-0
                  [&_li]:mb-1 [&_li]:leading-relaxed
                  [&_li_span:first-child]:font-medium [&_li_span:first-child]:text-zinc-900
                  [&_#color-warning]:mt-2 [&_#color-warning]:text-xs [&_#color-warning]:font-normal [&_#color-warning]:text-zinc-400
                  [&_#used-warning]:mt-2 [&_#used-warning]:text-xs [&_#used-warning]:font-normal [&_#used-warning]:text-zinc-400"
                dangerouslySetInnerHTML={{ __html: accordionItem.content }}
              />

              {accordionItem.images && (
                <div
                  className={`mt-3 grid gap-3 ${accordionItem.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
                >
                  {accordionItem.images.map((image) => (
                    <div key={image} className="relative aspect-square">
                      <Image src={image} alt={accordionItem.title} fill sizes="50vw" className="object-contain" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
