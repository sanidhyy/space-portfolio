import type { Metadata } from "next";
import type { IconType } from "react-icons";
import { FaAws, FaGithub, FaReact } from "react-icons/fa";
import { RxLinkedinLogo } from "react-icons/rx";
import {
  SiCss,
  SiFirebase,
  SiJavascript,
  SiLeetcode,
  SiNextdotjs,
  SiNodedotjs,
  SiReactquery,
  SiTypescript,
  SiVite,
} from "react-icons/si";

export const iconRegistry = {
  aws: FaAws,
  css: SiCss,
  firebase: SiFirebase,
  github: FaGithub,
  javascript: SiJavascript,
  leetcode: SiLeetcode,
  linkedin: RxLinkedinLogo,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  react: FaReact,
  reactQuery: SiReactquery,
  typescript: SiTypescript,
  vite: SiVite,
} satisfies Record<string, IconType>;

export type IconKey = keyof typeof iconRegistry;

type NavSection = {
  id: string;
  title: string;
  enabled: boolean;
};

type HeroIcon = {
  name: string;
  icon: IconKey;
  left: string;
  delay: number;
};

type SkillItem = {
  name: string;
  image: string;
  width: number;
  height: number;
};

type FooterLink = {
  name: string;
  link: string;
  icon?: IconKey;
};

export const cms = {
  seo: {
    title: "Payoshnee Joshi | Cloud and AI/ML Engineer",
    description:
      "Portfolio of Payoshnee Joshi, a Cloud and AI/ML Engineer building reliable cloud systems, intelligent applications, and production-ready machine learning solutions.",
    keywords: [
      "Payoshnee Joshi",
      "Cloud Engineer",
      "AI Engineer",
      "ML Engineer",
      "AWS",
      "Next.js portfolio",
      "Machine Learning",
      "Software Engineer",
    ],
    favicon: "/favicon.ico",
    image: "/projects/project-1.png",
    url: "https://payoshnee-joshi-portfolio.vercel.app",
  },
  navSections: [
    { id: "about-me", title: "About me", enabled: true },
    { id: "skills", title: "Skills", enabled: true },
    { id: "blogs", title: "Blogs", enabled: true },
    { id: "projects", title: "Projects", enabled: true },
  ] satisfies NavSection[],
  hero: {
    badge: "Cloud and AI/ML Portfolio",
    titlePrefix: "Hi my name is",
    titleHighlight: "Payoshnee Joshi",
    subtitle: "Cloud and AI/ML Engineer.",
    cta: {
      label: "Know more about me",
      href: "#blogs",
    },
    icons: [
      { name: "React", icon: "react", left: "14%", delay: 0 },
      { name: "JavaScript", icon: "javascript", left: "48%", delay: 0.35 },
      { name: "Firebase", icon: "firebase", left: "30%", delay: 0.7 },
      { name: "Node.js", icon: "nodejs", left: "56%", delay: 1.05 },
      { name: "Next.js", icon: "nextjs", left: "68%", delay: 1.4 },
      { name: "AWS", icon: "aws", left: "76%", delay: 1.75 },
      { name: "TypeScript", icon: "typescript", left: "40%", delay: 2.1 },
      { name: "GitHub", icon: "github", left: "52%", delay: 2.45 },
      { name: "CSS", icon: "css", left: "9%", delay: 2.8 },
      { name: "Vite", icon: "vite", left: "23%", delay: 3.15 },
      { name: "React Query", icon: "reactQuery", left: "33%", delay: 3.5 },
    ] satisfies HeroIcon[],
  },
  skills: {
    badge: "Think better with modern cloud systems",
    heading: "Making intelligent apps with modern technologies.",
    subheading: "Cloud, AI/ML, and product engineering.",
    groups: [
      {
        title: "Frontend",
        items: [
          { name: "HTML", image: "html.png", width: 80, height: 80 },
          { name: "CSS", image: "css.png", width: 80, height: 80 },
          { name: "JavaScript", image: "js.png", width: 65, height: 65 },
          { name: "TypeScript", image: "ts.png", width: 80, height: 80 },
          { name: "React", image: "react.png", width: 80, height: 80 },
          { name: "Next.js", image: "next.png", width: 80, height: 80 },
          { name: "Tailwind CSS", image: "tailwind.png", width: 80, height: 80 },
        ] satisfies SkillItem[],
      },
      {
        title: "Cloud and Backend",
        items: [
          { name: "Node.js", image: "node.png", width: 80, height: 80 },
          { name: "Firebase", image: "firebase.png", width: 55, height: 55 },
          { name: "PostgreSQL", image: "postgresql.png", width: 70, height: 70 },
          { name: "MySQL", image: "mysql.png", width: 70, height: 70 },
          { name: "Docker", image: "docker.png", width: 70, height: 70 },
        ] satisfies SkillItem[],
      },
      {
        title: "Product Tools",
        items: [
          { name: "Figma", image: "figma.png", width: 50, height: 50 },
          { name: "React Query", image: "reactquery.png", width: 80, height: 80 },
          { name: "Framer Motion", image: "framer.png", width: 80, height: 80 },
        ] satisfies SkillItem[],
      },
    ],
  },
  blogs: [
    {
      title: "Designing Cloud Systems For AI Workloads",
      excerpt:
        "How to think about storage, compute, monitoring, and cost when shipping AI/ML features into production.",
      date: "2026-08-07",
      slug: "cloud-systems-for-ai-workloads",
    },
    {
      title: "From Model Prototype To Reliable Product",
      excerpt:
        "A practical checklist for taking experiments out of notebooks and into user-facing applications.",
      date: "2026-08-07",
      slug: "model-prototype-to-product",
    },
  ] satisfies Array<{
    title: string;
    excerpt: string;
    date: string;
    slug: string;
  }>,
  projects: [
    {
      title: "AI Cloud Portfolio",
      description:
        "A space-themed portfolio with animated hero icons, dynamic content sections, and SEO-managed profile content.",
      image: "/projects/project-1.png",
      link: "",
    },
    {
      title: "ML Workflow Dashboard",
      description:
        "A dashboard concept for tracking datasets, experiments, deployment health, and model performance.",
      image: "/projects/project-2.png",
      link: "",
    },
    {
      title: "Serverless Data Pipeline",
      description:
        "A cloud pipeline concept for event processing, storage, and analytics with production observability.",
      image: "/projects/project-3.png",
      link: "",
    },
  ] satisfies Array<{
    title: string;
    description: string;
    image: string;
    link: string;
  }>,
  customSections: [
    {
      id: "experience",
      title: "Experience",
      navTitle: "Experience",
      enabled: false,
      body: "Add this section by setting enabled to true. It will automatically appear on the page and in the rocket-stage nav.",
    },
  ] satisfies Array<{
    id: string;
    title: string;
    navTitle: string;
    enabled: boolean;
    body: string;
  }>,
  socials: [
    { name: "GitHub", icon: "github", link: "https://github.com/payoshnee-joshi" },
    { name: "LinkedIn", icon: "linkedin", link: "https://www.linkedin.com/in/payoshnee-joshi" },
    { name: "LeetCode", icon: "leetcode", link: "https://leetcode.com/u/payoshnee-joshi" },
  ] satisfies Array<{ name: string; icon: IconKey; link: string }>,
  footer: {
    copyrightName: "Payoshnee Joshi",
    columns: [
      {
        title: "Social Media",
        links: [
          { name: "GitHub", link: "https://github.com/payoshnee-joshi", icon: "github" },
          { name: "LinkedIn", link: "https://www.linkedin.com/in/payoshnee-joshi", icon: "linkedin" },
          { name: "LeetCode", link: "https://leetcode.com/u/payoshnee-joshi", icon: "leetcode" },
        ] satisfies FooterLink[],
      },
      {
        title: "About",
        links: [
          { name: "Know more about me", link: "#about-me" },
          { name: "Read blogs", link: "#blogs" },
          { name: "View projects", link: "#projects" },
        ] satisfies FooterLink[],
      },
    ],
  },
} as const;

export const enabledNavSections = [
  ...cms.navSections.filter((section) => section.enabled),
  ...cms.customSections
    .filter((section) => section.enabled)
    .map((section) => ({
      id: section.id,
      title: section.navTitle,
      enabled: section.enabled,
    })),
];

export const siteConfig: Metadata = {
  metadataBase: new URL(cms.seo.url),
  title: cms.seo.title,
  description: cms.seo.description,
  keywords: [...cms.seo.keywords],
  authors: {
    name: cms.footer.copyrightName,
  },
  openGraph: {
    title: cms.seo.title,
    description: cms.seo.description,
    url: cms.seo.url,
    images: [{ url: cms.seo.image }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: cms.seo.title,
    description: cms.seo.description,
    images: [cms.seo.image],
  },
  icons: {
    icon: cms.seo.favicon,
  },
};
