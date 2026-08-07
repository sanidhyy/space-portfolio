import { NextRequest, NextResponse } from "next/server";

import { isAdminPassword, readCms, writeCms } from "@/lib/cms-store";

export async function GET() {
  return NextResponse.json(await readCms());
}

export async function PUT(request: NextRequest) {
  if (!isAdminPassword(request.headers.get("x-admin-password"))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  await writeCms(data);

  return NextResponse.json({ message: "Saved" });
}
