import { Achievements } from "@/components/main/achievements";
import { Blogs } from "@/components/main/blogs";
import { Certifications } from "@/components/main/certifications";
import { Contact } from "@/components/main/contact";
import { CustomSections } from "@/components/main/custom-sections";
import { Experience } from "@/components/main/experience";
import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";
import { readCms } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const cms = await readCms();

  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero cms={cms} />
        <Skills cms={cms} />
        <Certifications cms={cms} />
        <Experience cms={cms} />
        <Achievements cms={cms} />
        <Blogs cms={cms} />
        <Projects cms={cms} />
        <Contact cms={cms} />
        <CustomSections cms={cms} />
      </div>
    </main>
  );
}
