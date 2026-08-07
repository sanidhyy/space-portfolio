"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import { iconRegistry } from "@/config";
import { getEnabledNavSections, type CmsData } from "@/lib/cms-shared";

type NavbarProps = {
  cms: CmsData;
};

export const Navbar = ({ cms }: NavbarProps) => {
  const enabledNavSections = useMemo(() => getEnabledNavSections(cms), [cms]);
  const navScrollRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(
    enabledNavSections[0]?.id ?? ""
  );
  const activeIndex = enabledNavSections.findIndex(
    (item) => item.id === activeSection
  );

  useEffect(() => {
    const updateActiveSection = () => {
      const currentSection = enabledNavSections.reduce<string>(
        (current, link) => {
          const section = document.getElementById(link.id);

          if (!section) {
            return current;
          }

          const sectionTop = section.getBoundingClientRect().top;

          return sectionTop <= 140 ? link.id : current;
        },
        enabledNavSections[0]?.id ?? ""
      );

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });

    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [enabledNavSections]);

  useEffect(() => {
    itemRefs.current[activeSection]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeSection]);

  return (
    <div className="fixed top-0 z-50 h-[70px] w-full border-b border-[#7042f833] bg-[#03001488] px-3 shadow-lg shadow-[#2A0E61]/40 backdrop-blur-md">
      <div className="m-auto flex h-full w-full items-center justify-center gap-3 md:justify-between">
        <div className="hidden w-4 shrink-0 md:block" />

        <nav className="relative hidden h-full min-w-0 flex-1 flex-row items-center justify-center md:flex">
          <div className="pointer-events-none absolute left-0 z-10 h-full w-10 bg-gradient-to-r from-[#030014] to-transparent" />
          <div className="pointer-events-none absolute right-0 z-10 h-full w-10 bg-gradient-to-l from-[#030014] to-transparent" />

          <div
            ref={navScrollRef}
            className="scrollbar-hidden flex w-full items-center gap-2 overflow-x-auto scroll-smooth px-8 text-gray-200"
            onWheel={(event) => {
              if (!navScrollRef.current || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
                return;
              }

              navScrollRef.current.scrollLeft += event.deltaY;
            }}
          >
            {enabledNavSections.map((link, index) => {
              const isCompleted = index <= activeIndex;

              return (
                <Link
                  ref={(element) => {
                    itemRefs.current[link.id] = element;
                  }}
                  key={link.title}
                  href={`#${link.id}`}
                  className={[
                    "relative flex h-11 shrink-0 items-center justify-center px-6 text-sm font-semibold transition",
                    "before:absolute before:inset-0 before:-z-10 before:border before:border-white/15 before:bg-[#12082d]/90 before:shadow-lg before:shadow-purple-950/40 before:transition",
                    "hover:text-white hover:before:bg-[#1c0d46]",
                    isCompleted
                      ? "text-emerald-50 before:border-emerald-300 before:bg-emerald-500/70 before:shadow-emerald-400/60"
                      : "text-gray-200",
                  ].join(" ")}
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 22px) 0, 100% 50%, calc(100% - 22px) 100%, 0 100%, 22px 50%)",
                    minWidth: "clamp(110px, 11vw, 145px)",
                  }}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="hidden w-[140px] shrink-0 flex-row justify-end gap-5 md:flex">
          {cms.socials.map(({ link, name, icon }) => {
            const Icon = iconRegistry[icon];

            return (
              <Link
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                key={name}
                aria-label={name}
              >
                <Icon className="h-6 w-6 text-white transition hover:text-emerald-300" />
              </Link>
            );
          })}
        </div>

        <button
          className="ml-auto text-4xl text-white focus:outline-none md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-[#030014] p-5 flex flex-col items-center text-gray-300 md:hidden">
          <div className="flex flex-col items-center gap-4">
            {enabledNavSections.map((link, index) => {
              const isCompleted = index <= activeIndex;

              return (
                <Link
                  key={link.title}
                  href={`#${link.id}`}
                  className={[
                    "min-w-[170px] px-8 py-3 text-center font-semibold transition",
                    isCompleted
                      ? "bg-emerald-500/70 text-emerald-50"
                      : "bg-[#12082d] text-gray-200",
                  ].join(" ")}
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 22px) 0, 100% 50%, calc(100% - 22px) 100%, 0 100%, 22px 50%)",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>

          <div className="flex justify-center gap-6 mt-6">
            {cms.socials.map(({ link, name, icon }) => {
              const Icon = iconRegistry[icon];

              return (
                <Link
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  key={name}
                  aria-label={name}
                >
                  <Icon className="h-8 w-8 text-white transition hover:text-emerald-300" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
