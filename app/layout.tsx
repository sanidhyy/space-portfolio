import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { StarsCanvas } from "@/components/main/star-background";
import { CosmicPlayModal } from "@/components/main/cosmic-play-modal"; // Add this import
import { CosmicProvider } from "@/contexts/cosmic-context"; // Add this import
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden",
          inter.className
        )}
      >
        <CosmicProvider> {/* Add this wrapper */}
          <StarsCanvas />
          <Navbar />
          {children}
          <Footer />
          <CosmicPlayModal /> {/* Add this component */}
        </CosmicProvider> {/* Close the wrapper */}
      </body>
    </html>
  );
}