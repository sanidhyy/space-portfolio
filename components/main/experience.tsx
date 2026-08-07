"use client";

import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";

import type { CmsData } from "@/lib/cms-shared";

type ExperienceProps = {
  cms: CmsData;
};

export const Experience = ({ cms }: ExperienceProps) => {
  if (cms.experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Experience
        </h2>

        <div className="relative mt-12">
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-emerald-300 via-purple-400 to-transparent" />

          <div className="space-y-8">
            {cms.experiences.map((item, index) => (
              <motion.article
                key={`${item.role}-${item.company}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.14 }}
                className="relative pl-16"
              >
                <motion.div
                  className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-300 bg-[#050119] text-emerald-200 shadow-lg shadow-emerald-500/30"
                  whileInView={{ scale: [0.8, 1.12, 1] }}
                  viewport={{ once: true }}
                >
                  <FaBriefcase className="h-5 w-5" />
                </motion.div>

                <div className="rounded-lg border border-[#2A0E61] bg-[#030014aa] p-6">
                  <p className="text-sm text-emerald-300">
                    {item.period} · {item.location}
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-gray-400">{item.company}</p>
                  <p className="mt-4 text-gray-300">{item.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-300">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
