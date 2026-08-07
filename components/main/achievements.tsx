"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaTrophy } from "react-icons/fa";

import type { CmsData } from "@/lib/cms-shared";

type AchievementsProps = {
  cms: CmsData;
};

export const Achievements = ({ cms }: AchievementsProps) => {
  if (cms.achievements.length === 0) {
    return null;
  }

  return (
    <section id="achievements" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Achievements
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cms.achievements.map((achievement, index) => (
            <motion.article
              key={`${achievement.title}-${index}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.12 }}
              className="relative overflow-hidden rounded-lg border border-[#2A0E61] bg-[#030014aa] p-6 shadow-lg shadow-purple-500/10"
            >
              <motion.div
                className="absolute right-5 top-5 text-emerald-300/20"
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <FaTrophy className="h-16 w-16" />
              </motion.div>

              <div className="relative">
                <p className="text-sm text-emerald-300">{achievement.date}</p>
                <h3 className="mt-2 max-w-[85%] text-2xl font-semibold text-white">
                  {achievement.title}
                </h3>
                <p className="mt-4 text-gray-300">{achievement.description}</p>

                <Link
                  href={achievement.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-5 inline-flex text-sm font-semibold text-emerald-300 transition hover:text-emerald-100"
                >
                  View details
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
