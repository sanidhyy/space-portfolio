import React from 'react';
import { ContactSection } from '@/components/main/contact-section';

export default function ContactPage() {
  return (
    <main className="relative flex flex-col h-full w-full">
      <div className="flex flex-col gap-20">
        <ContactSection />
      </div>
    </main>
  );
}