import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import { cms as fallbackCms } from "@/config/cms";
import type { CmsData } from "@/lib/cms-shared";
import {
  cmsRowId,
  cmsTableName,
  getSupabaseAdmin,
  isSupabaseConfigured,
} from "@/lib/supabase-server";

const cmsPath = path.join(process.cwd(), "data", "cms.json");

async function readLocalCms(): Promise<CmsData> {
  try {
    const file = await fs.readFile(cmsPath, "utf8");

    return JSON.parse(file) as CmsData;
  } catch {
    return fallbackCms as unknown as CmsData;
  }
}

export async function readCms(): Promise<CmsData> {
  if (!isSupabaseConfigured()) {
    return readLocalCms();
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(cmsTableName)
    .select("content")
    .eq("id", cmsRowId)
    .maybeSingle();

  if (error) {
    console.error("Supabase CMS read failed", error);
    return readLocalCms();
  }

  if (!data?.content || !isCmsData(data.content)) {
    const seed = await readLocalCms();
    await writeCms(seed);
    return seed;
  }

  return data.content as CmsData;
}

function isCmsData(value: unknown): value is CmsData {
  return (
    typeof value === "object" &&
    value !== null &&
    "seo" in value &&
    "hero" in value &&
    "skills" in value &&
    "projects" in value
  );
}

export async function writeCms(data: CmsData) {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from(cmsTableName).upsert({
      id: cmsRowId,
      content: data,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      throw new Error(`Supabase CMS save failed: ${error.message}`);
    }

    return;
  }

  await fs.mkdir(path.dirname(cmsPath), { recursive: true });
  await fs.writeFile(cmsPath, `${JSON.stringify(data, null, 2)}\n`);
}

export function createSiteMetadata(data: CmsData): Metadata {
  return {
    metadataBase: new URL(data.seo.url),
    title: data.seo.title,
    description: data.seo.description,
    keywords: [...data.seo.keywords],
    authors: {
      name: data.footer.copyrightName,
    },
    openGraph: {
      title: data.seo.title,
      description: data.seo.description,
      url: data.seo.url,
      images: [{ url: data.seo.image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.seo.title,
      description: data.seo.description,
      images: [data.seo.image],
    },
    icons: {
      icon: data.seo.favicon,
    },
  };
}

export function isAdminPassword(password: string | null) {
  return password === (process.env.ADMIN_PASSWORD ?? "portfolio-admin");
}
