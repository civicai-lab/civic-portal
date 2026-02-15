"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/types/service";

interface FAQSectionProps {
  title: string;
  faqs: FAQ[];
}

export function FAQSection({ title, faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-muted/20 py-16 md:py-24" aria-label="よくある質問">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
        </div>

        {/* FAQ アコーディオン */}
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border bg-card"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-muted/50"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="pr-4 text-sm font-medium text-foreground md:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`size-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                className={`grid transition-all duration-200 ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t px-6 py-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
