"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProjectSkill = {
  name: string;
  image: string;
  width: number;
  height: number;
  level: "Beginner" | "Intermediate" | "Pro" | "Expert";
  percent: number;
};

type ProjectCardProps = {
  slug: string;
  src: string;
  title: string;
  description: string;
  highlights: string[];
  skillsUsed: ProjectSkill[];
  deploymentUrl: string;
  sourceCodeUrl: string;
};

const usageCells = Array.from({ length: 10 }, (_, index) => index + 1);

export const ProjectCard = ({
  src,
  slug,
  title,
  description,
  highlights,
  skillsUsed,
  deploymentUrl,
  sourceCodeUrl,
}: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const imageSrc = src || "/projects/project-1.png";

  return (
    <>
      <motion.article
        id={`project-${slug}`}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        whileHover={{ y: -8 }}
        className="scroll-mt-28 overflow-hidden rounded-lg border border-[#2A0E61] bg-[#03001499] shadow-lg shadow-purple-500/10"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-white/5">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 hover:scale-105"
          />
        </div>

        <div className="flex min-h-[260px] flex-col p-5">
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-300">
            {description}
          </p>

          {highlights.length > 0 && (
            <div className="mt-5 rounded-md border border-white/10 bg-white/[0.04] p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Project Highlights
              </p>
              <div className="mt-3 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
                {highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="min-w-[180px] rounded-md border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-100"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto flex flex-wrap gap-3 pt-5">
            {sourceCodeUrl && (
              <Link
                href={sourceCodeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-md border border-white/15 px-5 py-2 text-sm font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-200"
              >
                Source code
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="rounded-md bg-emerald-500 px-5 py-2 text-sm font-semibold text-[#03140c] transition hover:bg-emerald-300"
            >
              View project
            </button>
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={title}
              className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-emerald-300/30 bg-[#050119] shadow-2xl shadow-emerald-500/20"
              initial={{ opacity: 0, scale: 0.92, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 28 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-white/5">
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close project popup"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-2xl leading-none text-white transition hover:bg-emerald-500 hover:text-[#03140c]"
                >
                  x
                </button>
              </div>

              <div className="p-5 md:p-7">
                <h3 className="text-3xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-base leading-7 text-gray-300">
                  {description}
                </p>

                {highlights.length > 0 && (
                  <div className="mt-7">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Major achievements
                    </p>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="rounded-md border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100"
                        >
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {skillsUsed.length > 0 && (
                  <div className="mt-7">
                    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Tech stack usage graph
                        </p>
                        <h4 className="mt-1 text-xl font-semibold text-white">
                          What powers this project
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>Low</span>
                        <span className="h-3 w-3 rounded-sm bg-emerald-300/15" />
                        <span className="h-3 w-3 rounded-sm bg-emerald-300/35" />
                        <span className="h-3 w-3 rounded-sm bg-emerald-300/60" />
                        <span className="h-3 w-3 rounded-sm bg-emerald-300" />
                        <span>High</span>
                      </div>
                    </div>

                    <div className="mt-4 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.04] p-4 [scrollbar-width:thin]">
                      <div className="min-w-[680px] space-y-3">
                      {skillsUsed.map((skill) => {
                        const skillImage = skill.image.startsWith("/")
                          ? skill.image
                          : `/skills/${skill.image}`;
                        const filledCells = Math.ceil(skill.percent / 10);

                        return (
                          <div
                            key={skill.name}
                            className="grid grid-cols-[190px_1fr_70px] items-center gap-4 rounded-md border border-white/10 bg-[#03001499] p-3"
                          >
                            <div className="flex items-center gap-3">
                              <Image
                                src={skillImage}
                                width={skill.width}
                                height={skill.height}
                                alt={skill.name}
                                className="h-10 w-10 object-contain"
                              />
                              <div className="min-w-0">
                                <p className="truncate font-semibold text-white">
                                  {skill.name}
                                </p>
                                <p className="text-sm text-gray-400">
                                  {skill.level}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-10 gap-2">
                              {usageCells.map((cell) => (
                                <motion.span
                                  key={cell}
                                  initial={{ opacity: 0, scale: 0.65 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: cell * 0.035 }}
                                  className={[
                                    "h-7 rounded-sm border transition",
                                    cell <= filledCells
                                      ? "border-emerald-300/50 bg-emerald-300 shadow-sm shadow-emerald-500/40"
                                      : "border-white/10 bg-white/5",
                                  ].join(" ")}
                                />
                              ))}
                            </div>

                            <p className="text-right text-sm font-semibold text-emerald-200">
                              {skill.percent}%
                            </p>
                          </div>
                        );
                      })}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-7 flex flex-wrap gap-3">
                  {deploymentUrl && (
                    <Link
                      href={deploymentUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-md bg-emerald-500 px-5 py-2 text-sm font-semibold text-[#03140c] transition hover:bg-emerald-300"
                    >
                      Deployment
                    </Link>
                  )}
                  {sourceCodeUrl && (
                    <Link
                      href={sourceCodeUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-md border border-white/15 px-5 py-2 text-sm font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-200"
                    >
                      Source code
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
