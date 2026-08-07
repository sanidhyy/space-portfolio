import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

import { isAdminPassword } from "@/lib/cms-store";

const uploadDir = path.join(process.cwd(), "public", "uploads");

export async function POST(request: NextRequest) {
  if (!isAdminPassword(request.headers.get("x-admin-password"))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  const extension = path.extname(file.name) || ".png";
  const safeName = file.name
    .replace(extension, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const filename = `${safeName || "upload"}-${Date.now()}${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), bytes);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
