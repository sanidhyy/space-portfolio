"use client";

import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";
import type { CmsData } from "@/lib/cms-shared";
import { useState } from "react";

type SkillsProps = {
  cms: CmsData;
};

export const Skills = ({ cms }: SkillsProps) => {
  const [activeGroup, setActiveGroup] = useState("All");
  const [view, setView] = useState<"icons" | "graph">("icons");
  const groups =
    activeGroup === "All"
      ? cms.skills.groups
      : cms.skills.groups.filter((group) => group.title === activeGroup);

  return (
    <section
      id="skills"
      style={{ transform: "scale(0.9)" }}
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-visible py-20"
    >
      <SkillText cms={cms} />

      <div className="relative z-20 mt-8 flex w-full max-w-6xl flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-full gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
          {["All", ...cms.skills.groups.map((group) => group.title)].map((group) => (
            <button
              key={group}
              type="button"
              onClick={() => setActiveGroup(group)}
              className={[
                "shrink-0 rounded-md border px-4 py-2 text-sm font-semibold transition",
                activeGroup === group
                  ? "border-emerald-300 bg-emerald-400 text-[#03140c] shadow-lg shadow-emerald-500/20"
                  : "border-white/10 bg-white/[0.04] text-gray-300 hover:border-emerald-300/50 hover:text-emerald-100",
              ].join(" ")}
            >
              {group}
            </button>
          ))}
        </div>

        <div className="flex w-fit rounded-md border border-white/10 bg-white/[0.04] p-1">
          {[
            { label: "Icons", value: "icons" },
            { label: "Graph", value: "graph" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setView(option.value as "icons" | "graph")}
              className={[
                "rounded px-4 py-2 text-sm font-semibold transition",
                view === option.value
                  ? "bg-emerald-400 text-[#03140c]"
                  : "text-gray-300 hover:text-emerald-100",
              ].join(" ")}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-8 flex w-full max-w-6xl flex-col gap-8 px-4">
        {groups.map((group) => (
          <div
            key={group.title}
            className={
              view === "graph"
                ? "rounded-lg border border-white/10 bg-[#03001466] p-4 backdrop-blur-sm"
                : "relative"
            }
          >
            {view === "graph" && (
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                <div className="hidden items-center gap-2 text-xs text-gray-400 sm:flex">
                  <span>Beginner</span>
                  <span className="h-3 w-3 rounded-sm bg-emerald-300/20" />
                  <span className="h-3 w-3 rounded-sm bg-emerald-300/40" />
                  <span className="h-3 w-3 rounded-sm bg-emerald-300/70" />
                  <span className="h-3 w-3 rounded-sm bg-emerald-300" />
                  <span>Expert</span>
                </div>
              </div>
            )}

          <div
            className={
              view === "graph"
                ? "grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
                : "relative flex flex-row flex-wrap items-center justify-center gap-5"
            }
          >
            {group.items.map((skill, i) => (
              <SkillDataProvider
                key={`${group.title}-${skill.name}`}
                src={skill.image}
                name={skill.name}
                description={skill.description}
                level={skill.level}
                projectSlugs={skill.projectSlugs}
                projects={cms.projects.map((project) => ({
                  title: project.title,
                  slug: project.slug,
                }))}
                width={skill.width}
                height={skill.height}
                index={i}
                view={view}
              />
            ))}
          </div>
        </div>
        ))}
      </div>

      <div className="pointer-events-none w-full h-full absolute overflow-hidden">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="none"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
};
