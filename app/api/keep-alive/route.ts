import { NextResponse } from "next/server";

import { readCms } from "@/lib/cms-store";

export async function GET() {
  const cms = await readCms();

  return NextResponse.json({
    ok: true,
    checkedAt: new Date().toISOString(),
    siteTitle: cms.seo.title,
  });
}
