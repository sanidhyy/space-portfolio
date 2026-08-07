"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaAward, FaExternalLinkAlt } from "react-icons/fa";

import type { CmsData } from "@/lib/cms-shared";

type CertificationsProps = {
  cms: CmsData;
};

export const Certifications = ({ cms }: CertificationsProps) => {
  if (cms.certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Certifications
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cms.certifications.map((cert, index) => (
            <motion.article
              key={`${cert.title}-${cert.issuer}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.12 }}
              className="relative overflow-hidden rounded-lg border border-emerald-300/20 bg-[#050119cc] p-6 shadow-lg shadow-emerald-500/10"
            >
              <motion.div
                className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-emerald-300/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-emerald-300/40 bg-emerald-400/10 text-emerald-200">
                  <FaAward className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-emerald-300">{cert.issuer}</p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">{cert.date}</p>
                </div>
              </div>

              <p className="mt-5 text-gray-300">{cert.description}</p>

              <Link
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-100"
              >
                View credential <FaExternalLinkAlt className="h-4 w-4" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
