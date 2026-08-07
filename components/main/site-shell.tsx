"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import type { CmsData } from "@/lib/cms-shared";

type SiteShellProps = PropsWithChildren<{
  cms: CmsData;
}>;

export const SiteShell = ({ children, cms }: SiteShellProps) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar cms={cms} />
      {children}
      <Footer cms={cms} />
    </>
  );
};
