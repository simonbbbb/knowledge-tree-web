import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactTabs } from "./ContactTabs";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a demo, start a free trial, or talk to sales. Our team responds within one business day.",
};

export default function ContactPage() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-bg-dark to-bg-dark" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
            Let&apos;s talk.
          </h1>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Request a personalized demo, start your free trial, or get in touch
            with sales. We respond within one business day.
          </p>
        </div>
        <Suspense fallback={<div className="min-h-[400px]" />}>
          <ContactTabs />
        </Suspense>
      </div>
    </section>
  );
}
