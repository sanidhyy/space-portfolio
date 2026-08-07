"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import { iconRegistry } from "@/config";
import type { CmsData } from "@/lib/cms-shared";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

type HeroContentProps = {
  cms: CmsData;
};

export const HeroContent = ({ cms }: HeroContentProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">{cms.hero.badge}</h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            {cms.hero.titlePrefix}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {cms.hero.titleHighlight}
            </span>{" "}
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          {cms.hero.subtitle}
        </motion.p>

        <motion.a
          href={cms.hero.cta.href}
          variants={slideInFromLeft(1)}
          className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
        >
          {cms.hero.cta.label}
        </motion.a>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="relative w-full h-[650px] flex justify-center items-center overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute left-[12%] top-[18%] h-[460px] w-[460px] rounded-full border border-white/10" />
          <div className="absolute left-[24%] top-[30%] h-[300px] w-[300px] rounded-full border border-white/10" />
          <div className="absolute left-[8%] top-[50%] h-px w-[84%] bg-white/10" />
          <div className="absolute left-[50%] top-[8%] h-[84%] w-px bg-white/10" />
          <div className="absolute left-[22%] top-[12%] h-[520px] w-px rotate-45 bg-white/10" />
          <div className="absolute right-[20%] top-[12%] h-[520px] w-px -rotate-45 bg-white/10" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {cms.hero.icons.map((skill) => {
            const Icon = iconRegistry[skill.icon];

            return (
              <motion.div
                key={skill.name}
                className="absolute top-0 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg shadow-purple-500/20"
                style={{ left: skill.left }}
                initial={{ y: -90, opacity: 0, scale: 0.85 }}
                animate={{
                  y: [-90, 120, 360, 590],
                  opacity: [0, 1, 1, 0],
                  scale: [0.85, 1, 1, 0.92],
                }}
                transition={{
                  duration: 4,
                  delay: skill.delay,
                  ease: "linear",
                  repeat: Infinity,
                  repeatDelay: 0.25,
                }}
              >
                <Icon
                  aria-label={skill.name}
                  className="h-10 w-10 text-white grayscale opacity-75"
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};
