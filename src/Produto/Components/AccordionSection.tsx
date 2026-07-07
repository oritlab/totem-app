import { AccordionSectionProps } from "@/src/global/types/produto";

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
            <p className="pb-4 text-sm text-zinc-600">{accordionItem.content}</p>
          )}
        </div>
      ))}
    </div>
  );
}
