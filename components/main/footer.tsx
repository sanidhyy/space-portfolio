import Link from "next/link";

import { iconRegistry } from "@/config";
import type { CmsData } from "@/lib/cms-shared";

type FooterProps = {
  cms: CmsData;
};

export const Footer = ({ cms }: FooterProps) => {
  return (
    <div className="w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px]">
      <div className="w-full flex flex-col items-center justify-center m-auto">
        <div className="w-full h-full flex flex-row items-center justify-around flex-wrap">
          {cms.footer.columns.map((column) => (
            <div
              key={column.title}
              className="min-w-[200px] h-auto flex flex-col items-center justify-start"
            >
              <h3 className="font-bold text-[16px]">{column.title}</h3>
              {column.links.map((item) => {
                const Icon = item.icon ? iconRegistry[item.icon] : null;

                return (
                  <Link
                    key={`${column.title}-${item.name}`}
                    href={item.link}
                    target={item.link.startsWith("#") ? undefined : "_blank"}
                    rel={
                      item.link.startsWith("#") ? undefined : "noreferrer noopener"
                    }
                    className="flex flex-row items-center my-[15px]"
                  >
                    {Icon && <Icon />}
                    <span className="text-[15px] ml-[6px]">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mb-[20px] text-[15px] text-center">
          &copy; {cms.footer.copyrightName} {new Date().getFullYear()} Inc. All
          rights reserved.
        </div>
      </div>
    </div>
  );
};
