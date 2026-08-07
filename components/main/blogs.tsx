import Link from "next/link";

import type { CmsData } from "@/lib/cms-shared";

type BlogsProps = {
  cms: CmsData;
};

export const Blogs = ({ cms }: BlogsProps) => {
  if (cms.blogs.length === 0) {
    return null;
  }

  return (
    <section
      id="blogs"
      className="flex flex-col items-center justify-center px-6 py-20"
    >
      <h2 className="py-10 text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
        Blogs
      </h2>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        {cms.blogs.map((blog) => (
          <article
            key={blog.slug}
            className="rounded-lg border border-[#2A0E61] bg-[#03001499] p-6 shadow-lg shadow-[#2A0E61]/30"
          >
            <time className="text-sm text-emerald-300" dateTime={blog.date}>
              {new Intl.DateTimeFormat("en", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(new Date(blog.date))}
            </time>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              {blog.title}
            </h3>
            <p className="mt-3 text-gray-300">{blog.excerpt}</p>
            <Link
              href={`#${blog.slug}`}
              className="mt-5 inline-flex text-sm font-semibold text-emerald-300 transition hover:text-emerald-100"
            >
              Read article
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
