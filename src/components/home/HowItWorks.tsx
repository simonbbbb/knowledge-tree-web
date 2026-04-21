"use client";

import { Link, Search, FileText } from "lucide-react";
import { STEPS } from "@/lib/constants";
import { Section, SectionHeading } from "@/components/shared/Section";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const iconMap: Record<string, React.ElementType> = {
  Link,
  Search,
  FileText,
};

export function HowItWorks() {
  return (
    <Section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="How It Works"
          title="Three steps to full visibility"
          description="From zero to complete infrastructure documentation in under 30 minutes."
        />

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-600/50 via-accent-purple/30 to-transparent hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {STEPS.map((step, i) => {
              const Icon = iconMap[step.icon] || Search;
              const isLeft = i % 2 === 0;

              return (
                <ScrollReveal key={step.step} delay={i * 0.15}>
                  <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    {/* Content */}
                    <div
                      className={`flex-1 ${
                        isLeft ? "md:text-right md:order-1" : "md:text-left md:order-3"
                      }`}
                    >
                      <h3 className="text-xl font-bold text-text-primary mb-3">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Center node */}
                    <div className="relative z-10 md:order-2">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-purple flex items-center justify-center shadow-lg shadow-primary-600/25">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent-orange text-[10px] font-bold flex items-center justify-center text-black">
                        {step.step}
                      </span>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="flex-1 md:order-3 hidden md:block" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
