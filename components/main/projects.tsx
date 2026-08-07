import { ProjectCard } from "@/components/sub/project-card";
import type { CmsData } from "@/lib/cms-shared";

type ProjectsProps = {
  cms: CmsData;
};

export const Projects = ({ cms }: ProjectsProps) => {
  const levelPercent = {
    Beginner: 25,
    Intermediate: 55,
    Pro: 78,
    Expert: 100,
  };

  const skillUsage = cms.skills.groups.flatMap((group) =>
    group.items.map((skill) => ({
      name: skill.name,
      image: skill.image,
      width: skill.width,
      height: skill.height,
      level: skill.level,
      percent: levelPercent[skill.level],
      projectSlugs: skill.projectSlugs,
    }))
  );

  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center py-20"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>
      <div className="grid h-full w-full gap-6 px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
        {cms.projects.map((project) => {
          const skillsUsed = skillUsage
            .filter((skill) => skill.projectSlugs.includes(project.slug))
            .map(({ projectSlugs, ...skill }) => skill);

          return (
            <ProjectCard
              key={project.title}
              slug={project.slug}
              src={project.image}
              title={project.title}
              description={project.description}
              highlights={project.highlights}
              skillsUsed={skillsUsed}
              deploymentUrl={project.deploymentUrl}
              sourceCodeUrl={project.sourceCodeUrl}
            />
          );
        })}
      </div>
    </section>
  );
};
