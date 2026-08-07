import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

import { isAdminPassword } from "@/lib/cms-store";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  uploadBucketName,
} from "@/lib/supabase-server";

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

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const uploadPath = `cms/${filename}`;
    const { error } = await withSupabaseJwtRetry(async () =>
      supabase.storage.from(uploadBucketName).upload(uploadPath, bytes, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      })
    );

    if (error) {
      return NextResponse.json(
        { message: `Supabase upload failed: ${error.message}` },
        { status: 500 }
      );
    }

    const { data } = supabase.storage
      .from(uploadBucketName)
      .getPublicUrl(uploadPath);

    return NextResponse.json({ url: data.publicUrl });
  }

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), bytes);

  return NextResponse.json({ url: `/uploads/${filename}` });
}

type SupabaseResult = {
  error: { code?: string; message?: string } | null;
};

async function withSupabaseJwtRetry<T>(
  operation: () => Promise<T & SupabaseResult>
): Promise<T & SupabaseResult> {
  const result = await operation();

  if (
    result.error?.code !== "PGRST303" &&
    !result.error?.message?.toLowerCase().includes("jwt issued at future")
  ) {
    return result;
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return operation();
}
