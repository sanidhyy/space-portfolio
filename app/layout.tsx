import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { SiteShell } from "@/components/main/site-shell";
import { StarsCanvas } from "@/components/main/star-background";
import { createSiteMetadata, readCms } from "@/lib/cms-store";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  themeColor: "#030014",
};

export async function generateMetadata(): Promise<Metadata> {
  return createSiteMetadata(await readCms());
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const cms = await readCms();

  return (
    <html lang="en">
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden",
          inter.className
        )}
      >
        <StarsCanvas />
        <SiteShell cms={cms}>{children}</SiteShell>
      </body>
    </html>
  );
}
