"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

type SkillDataProviderProps = {
  src: string;
  name: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Pro" | "Expert";
  projectSlugs: string[];
  projects: Array<{ title: string; slug: string }>;
  width: number;
  height: number;
  index: number;
  view?: "icons" | "graph";
};

const levelPercent = {
  Beginner: 25,
  Intermediate: 55,
  Pro: 78,
  Expert: 100,
};

const levelStyles = {
  Beginner:
    "border-emerald-300/20 bg-emerald-300/[0.06] shadow-emerald-500/5",
  Intermediate:
    "border-emerald-300/35 bg-emerald-300/[0.1] shadow-emerald-500/10",
  Pro: "border-emerald-300/60 bg-emerald-300/[0.16] shadow-emerald-500/20",
  Expert:
    "border-emerald-300 bg-emerald-300/[0.24] shadow-emerald-500/30",
};

export const SkillDataProvider = ({
  src,
  name,
  description,
  level,
  projectSlugs,
  projects,
  width,
  height,
  index,
  view = "icons",
}: SkillDataProviderProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const animationDelay = 0.1;
  const usedProjects = projects.filter((project) =>
    projectSlugs.includes(project.slug)
  );
  const imageSrc = src.startsWith("/") ? src : `/skills/${src}`;
  const isGraphView = view === "graph";

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -10, scale: 1.04 }}
      custom={index}
      transition={{ delay: index * animationDelay }}
      className={
        isGraphView
          ? [
              "group relative z-10 flex aspect-square min-h-[112px] w-full items-center justify-center rounded-md border shadow-lg transition hover:z-[200]",
              levelStyles[level],
            ].join(" ")
          : "group relative z-10 flex h-[92px] w-[92px] items-center justify-center rounded-lg hover:z-[200]"
      }
    >
      <motion.div
        className={
          isGraphView
            ? "relative z-10 flex h-full w-full flex-col items-center justify-center gap-3 rounded-md p-3 transition duration-500 group-hover:bg-white/10 group-hover:shadow-2xl group-hover:shadow-emerald-500/20"
            : "relative z-10 flex h-full w-full items-center justify-center rounded-lg transition duration-500 group-hover:bg-white/10 group-hover:shadow-2xl group-hover:shadow-emerald-500/20"
        }
        whileHover={isGraphView ? { scale: 1.12, y: -6 } : { scale: 1.35, y: -12 }}
      >
        <Image
          src={imageSrc}
          width={width}
          height={height}
          alt={name}
          className={
            isGraphView
              ? "h-12 w-12 select-none object-contain"
              : "select-none"
          }
        />
        {isGraphView && (
          <div className="w-full text-center">
            <p className="truncate text-sm font-semibold text-white">{name}</p>
            <p className="text-xs text-emerald-200">{levelPercent[level]}%</p>
          </div>
        )}
      </motion.div>

      <div
        className="pointer-events-none absolute left-1/2 top-[calc(100%+14px)] z-[250] w-[300px] -translate-x-1/2 translate-y-5 scale-95 rounded-lg border border-emerald-300/30 bg-[#050119] p-4 text-left opacity-0 shadow-2xl shadow-emerald-500/25 backdrop-blur-md transition duration-500 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
      >
        <h4 className="text-lg font-semibold text-white">{name}</h4>
        <p className="mt-1 text-sm text-gray-300">{description}</p>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-200">
            <span>{level}</span>
            <span>{levelPercent[level]}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-emerald-400"
              initial={{ width: 0 }}
              whileInView={{ width: `${levelPercent[level]}%` }}
              transition={{ duration: 0.7 }}
            />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Used in projects
          </p>
          <div className="mt-2 flex flex-col gap-2">
            {usedProjects.length > 0 ? (
              usedProjects.map((project) => (
                <a
                  key={project.slug}
                  href={`#project-${project.slug}`}
                  className="rounded-md border border-white/10 px-3 py-2 text-sm text-white transition hover:border-emerald-300 hover:text-emerald-200"
                >
                  {project.title}
                </a>
              ))
            ) : (
              <span className="text-sm text-gray-500">
                No project linked yet.
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
