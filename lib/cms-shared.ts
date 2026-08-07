import type { IconKey } from "@/config";

export type CmsData = {
  seo: {
    title: string;
    description: string;
    keywords: string[];
    favicon: string;
    image: string;
    url: string;
  };
  navSections: Array<{ id: string; title: string; enabled: boolean }>;
  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    cta: { label: string; href: string };
    icons: Array<{ name: string; icon: IconKey; left: string; delay: number }>;
  };
  skills: {
    badge: string;
    heading: string;
    subheading: string;
    groups: Array<{
      title: string;
      items: Array<{
        name: string;
        description: string;
        level: "Beginner" | "Intermediate" | "Pro" | "Expert";
        projectSlugs: string[];
        image: string;
        width: number;
        height: number;
      }>;
    }>;
  };
  blogs: Array<{
    title: string;
    excerpt: string;
    date: string;
    slug: string;
  }>;
  projects: Array<{
    title: string;
    slug: string;
    description: string;
    highlights: string[];
    image: string;
    deploymentUrl: string;
    sourceCodeUrl: string;
  }>;
  contact: {
    heading: string;
    subheading: string;
    email: string;
    phone: string;
    location: string;
    buttonLabel: string;
  };
  certifications: Array<{
    title: string;
    issuer: string;
    date: string;
    credentialUrl: string;
    description: string;
  }>;
  experiences: Array<{
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
    highlights: string[];
  }>;
  achievements: Array<{
    title: string;
    date: string;
    description: string;
    link: string;
  }>;
  customSections: Array<{
    id: string;
    title: string;
    navTitle: string;
    enabled: boolean;
    body: string;
  }>;
  socials: Array<{ name: string; icon: IconKey; link: string }>;
  footer: {
    copyrightName: string;
    columns: Array<{
      title: string;
      links: Array<{ name: string; link: string; icon?: IconKey }>;
    }>;
  };
};

export function getEnabledNavSections(data: CmsData) {
  return [
    ...data.navSections.filter((section) => section.enabled),
    ...data.customSections
      .filter((section) => section.enabled)
      .map((section) => ({
        id: section.id,
        title: section.navTitle,
        enabled: section.enabled,
      })),
  ];
}
