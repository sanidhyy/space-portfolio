import type { CmsData } from "@/lib/cms-shared";

type CustomSectionsProps = {
  cms: CmsData;
};

export const CustomSections = ({ cms }: CustomSectionsProps) => {
  const enabledSections = cms.customSections.filter((section) => section.enabled);

  if (enabledSections.length === 0) {
    return null;
  }

  return (
    <>
      {enabledSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="flex flex-col items-center justify-center px-6 py-20"
        >
          <div className="w-full max-w-5xl">
            <h2 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {section.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {section.body}
            </p>
          </div>
        </section>
      ))}
    </>
  );
};
