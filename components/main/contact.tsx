"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

import type { CmsData } from "@/lib/cms-shared";

type ContactProps = {
  cms: CmsData;
};

export const Contact = ({ cms }: ContactProps) => {
  return (
    <section id="contact" className="px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        className="mx-auto max-w-5xl rounded-lg border border-[#2A0E61] bg-[#030014aa] p-8 text-center shadow-lg shadow-emerald-500/10"
      >
        <h2 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          {cms.contact.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-300">
          {cms.contact.subheading}
        </p>

        <div className="mt-8 grid gap-4 text-left md:grid-cols-3">
          <ContactItem
            icon={<FaEnvelope />}
            label="Email"
            value={cms.contact.email}
            href={`mailto:${cms.contact.email}`}
          />
          <ContactItem
            icon={<FaPhoneAlt />}
            label="Phone"
            value={cms.contact.phone}
            href={`tel:${cms.contact.phone}`}
          />
          <ContactItem
            icon={<FaMapMarkerAlt />}
            label="Location"
            value={cms.contact.location}
          />
        </div>

        <Link
          href={`mailto:${cms.contact.email}`}
          className="mt-8 inline-flex rounded-md bg-emerald-500 px-6 py-3 font-semibold text-[#03140c] transition hover:bg-emerald-300"
        >
          {cms.contact.buttonLabel}
        </Link>
      </motion.div>
    </section>
  );
};

const ContactItem = ({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) => {
  const content = (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="text-emerald-300">{icon}</div>
      <p className="mt-3 text-sm text-gray-400">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );

  return href ? (
    <Link href={href} className="transition hover:-translate-y-1">
      {content}
    </Link>
  ) : (
    content
  );
};
