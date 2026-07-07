import { AccordionSectionProps } from "../types";

export default function AccordionSection(props: AccordionSectionProps) {
  const { items, openIndex, handleToggle } = props;

  return (
    <div className="px-4 sm:px-6 py-3">
      {items.map((item, index) => (
        <div key={item.title} className="border-b border-black">
          <button
            className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-sm text-zinc-900"
            onClick={() => handleToggle(index)}
          >
            {item.title}
            <span className="text-lg font-light">{openIndex === index ? "-" : "+"}</span>
          </button>

          {openIndex === index && (
            <p className="pb-4 text-sm text-zinc-600">{item.content}</p>
          )}
        </div>
      ))}
    </div>
  );
}
