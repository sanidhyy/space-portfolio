"use client";

import { useEffect, useState } from "react";

import type { CmsData } from "@/lib/cms-shared";

const storageKey = "space-portfolio-admin-password";
const tabs = [
  "Hero",
  "Skills",
  "Certifications",
  "Experience",
  "Achievements",
  "Blogs",
  "Projects",
  "Contact",
  "Settings",
] as const;
const levels = ["Beginner", "Intermediate", "Pro", "Expert"] as const;
const iconOptions = [
  "aws",
  "css",
  "firebase",
  "github",
  "javascript",
  "leetcode",
  "linkedin",
  "nextjs",
  "nodejs",
  "react",
  "reactQuery",
  "typescript",
  "vite",
] as const;

type Tab = (typeof tabs)[number];

export default function AdminPage() {
  const [password, setPassword] = useState(() =>
    typeof window === "undefined"
      ? ""
      : localStorage.getItem(storageKey) ?? ""
  );
  const [cms, setCms] = useState<CmsData | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("Hero");
  const [status, setStatus] = useState("Loading CMS content...");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/cms")
      .then((response) => response.json())
      .then((data: CmsData) => {
        setCms(data);
        setStatus("Ready");
      })
      .catch(() => setStatus("Could not load CMS content."));
  }, []);

  const updateCms = (updater: (current: CmsData) => CmsData) => {
    setCms((current) => (current ? updater(current) : current));
  };

  const saveCms = async () => {
    if (!cms) return;

    setIsSaving(true);
    setStatus("Saving...");
    localStorage.setItem(storageKey, password);

    const response = await fetch("/api/cms", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify(cms),
    });

    setIsSaving(false);
    setStatus(
      response.ok
        ? "Saved. Refresh the portfolio to see changes."
        : "Wrong password or save failed."
    );
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "x-admin-password": password,
      },
      body: formData,
    });

    if (!response.ok) {
      setStatus("Upload failed. Check admin password.");
      return "";
    }

    const result = (await response.json()) as { url: string };
    setStatus(`Uploaded ${result.url}`);
    return result.url;
  };

  if (!cms) {
    return (
      <main className="min-h-screen bg-[#030014] px-6 py-24 text-white">
        {status}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#030014] text-white">
      <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
        <aside className="border-r border-white/10 bg-[#08031d] p-5">
          <h1 className="text-2xl font-semibold">Portfolio CMS</h1>
          <p className="mt-2 text-sm text-gray-400">Strapi-style dashboard</p>

          <nav className="mt-8 flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={[
                  "rounded-md px-4 py-3 text-left text-sm font-semibold transition",
                  activeTab === tab
                    ? "bg-emerald-500 text-[#03140c]"
                    : "bg-white/5 text-gray-300 hover:bg-white/10",
                ].join(" ")}
              >
                {tab}
              </button>
            ))}
          </nav>
        </aside>

        <section className="p-5 md:p-8">
          <div className="sticky top-0 z-20 mb-6 flex flex-col gap-3 border-b border-white/10 bg-[#030014dd] pb-5 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">{activeTab}</h2>
              <p className="mt-1 text-sm text-gray-400">{status}</p>
            </div>
            <div className="flex gap-3">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Admin password"
                className="h-11 rounded-md border border-white/15 bg-white/10 px-3 text-white outline-none focus:border-emerald-300"
              />
              <button
                type="button"
                onClick={saveCms}
                disabled={isSaving}
                className="h-11 rounded-md bg-emerald-500 px-6 font-semibold text-[#03140c] transition hover:bg-emerald-300 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          {activeTab === "Hero" && <HeroEditor cms={cms} updateCms={updateCms} />}
          {activeTab === "Skills" && (
            <SkillsEditor cms={cms} updateCms={updateCms} uploadFile={uploadFile} />
          )}
          {activeTab === "Certifications" && (
            <CertificationsEditor cms={cms} updateCms={updateCms} />
          )}
          {activeTab === "Experience" && (
            <ExperienceEditor cms={cms} updateCms={updateCms} />
          )}
          {activeTab === "Achievements" && (
            <AchievementsEditor cms={cms} updateCms={updateCms} />
          )}
          {activeTab === "Blogs" && <BlogsEditor cms={cms} updateCms={updateCms} />}
          {activeTab === "Projects" && (
            <ProjectsEditor cms={cms} updateCms={updateCms} uploadFile={uploadFile} />
          )}
          {activeTab === "Contact" && (
            <ContactEditor cms={cms} updateCms={updateCms} />
          )}
          {activeTab === "Settings" && (
            <SettingsEditor cms={cms} updateCms={updateCms} uploadFile={uploadFile} />
          )}
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea = false,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  textarea?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-300">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 min-h-24 w-full rounded-md border border-white/15 bg-white/10 px-3 py-2 text-white outline-none focus:border-emerald-300"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 h-11 w-full rounded-md border border-white/15 bg-white/10 px-3 text-white outline-none focus:border-emerald-300"
        />
      )}
    </label>
  );
}

function UploadField({
  label,
  uploadFile,
  onUploaded,
}: {
  label: string;
  uploadFile: (file: File) => Promise<string>;
  onUploaded: (url: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-300">{label}</span>
      <input
        type="file"
        accept="image/*,.ico,.svg"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          const url = await uploadFile(file);
          if (url) onUploaded(url);
        }}
        className="mt-2 block w-full rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm text-white file:mr-4 file:rounded-md file:border-0 file:bg-emerald-500 file:px-3 file:py-2 file:font-semibold file:text-[#03140c]"
      />
    </label>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      {children}
    </div>
  );
}

function HeroEditor({ cms, updateCms }: EditorProps) {
  return (
    <div className="space-y-5">
      <Panel>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Badge" value={cms.hero.badge} onChange={(value) => updateCms((c) => ({ ...c, hero: { ...c.hero, badge: value } }))} />
          <Field label="Title prefix" value={cms.hero.titlePrefix} onChange={(value) => updateCms((c) => ({ ...c, hero: { ...c.hero, titlePrefix: value } }))} />
          <Field label="Highlighted name" value={cms.hero.titleHighlight} onChange={(value) => updateCms((c) => ({ ...c, hero: { ...c.hero, titleHighlight: value } }))} />
          <Field label="Subtitle" value={cms.hero.subtitle} onChange={(value) => updateCms((c) => ({ ...c, hero: { ...c.hero, subtitle: value } }))} />
          <Field label="Button name" value={cms.hero.cta.label} onChange={(value) => updateCms((c) => ({ ...c, hero: { ...c.hero, cta: { ...c.hero.cta, label: value } } }))} />
          <Field label="Button URL" value={cms.hero.cta.href} onChange={(value) => updateCms((c) => ({ ...c, hero: { ...c.hero, cta: { ...c.hero.cta, href: value } } }))} />
        </div>
      </Panel>
      <ListHeader title="Hero animation skills" onAdd={() => updateCms((c) => ({ ...c, hero: { ...c.hero, icons: [...c.hero.icons, { name: "New Icon", icon: "react", left: "40%", delay: 0 }] } }))} />
      {cms.hero.icons.map((item, index) => (
        <Panel key={`${item.name}-${index}`}>
          <div className="grid gap-4 md:grid-cols-4">
            <Field label="Name" value={item.name} onChange={(value) => updateCms((c) => updateArray(c, "hero.icons", index, { ...item, name: value }))} />
            <SelectField label="Icon" value={item.icon} options={iconOptions} onChange={(value) => updateCms((c) => updateArray(c, "hero.icons", index, { ...item, icon: value }))} />
            <Field label="Left position" value={item.left} onChange={(value) => updateCms((c) => updateArray(c, "hero.icons", index, { ...item, left: value }))} />
            <Field label="Delay" type="number" value={item.delay} onChange={(value) => updateCms((c) => updateArray(c, "hero.icons", index, { ...item, delay: Number(value) }))} />
          </div>
        </Panel>
      ))}
    </div>
  );
}

type EditorProps = {
  cms: CmsData;
  updateCms: (updater: (current: CmsData) => CmsData) => void;
  uploadFile?: (file: File) => Promise<string>;
};

function ListHeader({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-semibold">{title}</h3>
      <button type="button" onClick={onAdd} className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-[#03140c]">Add new</button>
    </div>
  );
}

function SelectField<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: readonly T[]; onChange: (value: T) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-300">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value as T)} className="mt-2 h-11 w-full rounded-md border border-white/15 bg-[#11072b] px-3 text-white outline-none focus:border-emerald-300">
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function updateArray<T extends CmsData>(cms: T, path: string, index: number, value: unknown): T {
  const copy = structuredClone(cms);
  const parts = path.split(".");
  let target: Record<string, unknown> = copy as Record<string, unknown>;
  for (const part of parts.slice(0, -1)) target = target[part] as Record<string, unknown>;
  const key = parts.at(-1) as string;
  const array = target[key] as unknown[];
  array[index] = value;
  return copy;
}

function SkillsEditor({ cms, updateCms, uploadFile }: EditorProps) {
  return <div className="space-y-5">{cms.skills.groups.map((group, groupIndex) => <Panel key={group.title}><Field label="Group title" value={group.title} onChange={(value) => updateCms((c) => ({ ...c, skills: { ...c.skills, groups: c.skills.groups.map((g, i) => i === groupIndex ? { ...g, title: value } : g) } }))} /><div className="mt-5 space-y-4">{group.items.map((skill, skillIndex) => <div key={`${skill.name}-${skillIndex}`} className="grid gap-4 border-t border-white/10 pt-4 md:grid-cols-3"><Field label="Skill name" value={skill.name} onChange={(value) => updateCms((c) => updateSkill(c, groupIndex, skillIndex, { ...skill, name: value }))} /><Field label="Description" value={skill.description} onChange={(value) => updateCms((c) => updateSkill(c, groupIndex, skillIndex, { ...skill, description: value }))} /><SelectField label="Level" value={skill.level} options={levels} onChange={(value) => updateCms((c) => updateSkill(c, groupIndex, skillIndex, { ...skill, level: value }))} /><Field label="Image file/path" value={skill.image} onChange={(value) => updateCms((c) => updateSkill(c, groupIndex, skillIndex, { ...skill, image: value }))} />{uploadFile && <UploadField label="Upload skill icon" uploadFile={uploadFile} onUploaded={(url) => updateCms((c) => updateSkill(c, groupIndex, skillIndex, { ...skill, image: url }))} />}<Field textarea label="Project slugs, one per line" value={skill.projectSlugs.join("\n")} onChange={(value) => updateCms((c) => updateSkill(c, groupIndex, skillIndex, { ...skill, projectSlugs: value.split("\n").filter(Boolean) }))} /></div>)}</div><button type="button" onClick={() => updateCms((c) => ({ ...c, skills: { ...c.skills, groups: c.skills.groups.map((g, i) => i === groupIndex ? { ...g, items: [...g.items, { name: "New Skill", description: "Skill description", level: "Beginner", projectSlugs: [], image: "react.png", width: 80, height: 80 }] } : g) } }))} className="mt-5 rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-[#03140c]">Add skill</button></Panel>)}</div>;
}

function updateSkill(cms: CmsData, groupIndex: number, skillIndex: number, skill: CmsData["skills"]["groups"][number]["items"][number]) {
  return { ...cms, skills: { ...cms.skills, groups: cms.skills.groups.map((group, i) => i === groupIndex ? { ...group, items: group.items.map((item, j) => j === skillIndex ? skill : item) } : group) } };
}

function CertificationsEditor({ cms, updateCms }: EditorProps) {
  return <CollectionEditor title="Certifications" items={cms.certifications} onAdd={() => updateCms((c) => ({ ...c, certifications: [...c.certifications, { title: "New Certification", issuer: "", date: "", credentialUrl: "", description: "" }] }))} render={(item, index) => <Panel key={index}><div className="grid gap-4 md:grid-cols-2"><Field label="Title" value={item.title} onChange={(value) => updateCms((c) => updateArray(c, "certifications", index, { ...item, title: value }))} /><Field label="Issuer" value={item.issuer} onChange={(value) => updateCms((c) => updateArray(c, "certifications", index, { ...item, issuer: value }))} /><Field label="Date" value={item.date} onChange={(value) => updateCms((c) => updateArray(c, "certifications", index, { ...item, date: value }))} /><Field label="Credential URL" value={item.credentialUrl} onChange={(value) => updateCms((c) => updateArray(c, "certifications", index, { ...item, credentialUrl: value }))} /><Field textarea label="Description" value={item.description} onChange={(value) => updateCms((c) => updateArray(c, "certifications", index, { ...item, description: value }))} /></div></Panel>} />;
}

function ExperienceEditor({ cms, updateCms }: EditorProps) {
  return <CollectionEditor title="Experience" items={cms.experiences} onAdd={() => updateCms((c) => ({ ...c, experiences: [...c.experiences, { role: "New Role", company: "", period: "", location: "", description: "", highlights: [] }] }))} render={(item, index) => <Panel key={index}><div className="grid gap-4 md:grid-cols-2"><Field label="Role" value={item.role} onChange={(value) => updateCms((c) => updateArray(c, "experiences", index, { ...item, role: value }))} /><Field label="Company" value={item.company} onChange={(value) => updateCms((c) => updateArray(c, "experiences", index, { ...item, company: value }))} /><Field label="Period" value={item.period} onChange={(value) => updateCms((c) => updateArray(c, "experiences", index, { ...item, period: value }))} /><Field label="Location" value={item.location} onChange={(value) => updateCms((c) => updateArray(c, "experiences", index, { ...item, location: value }))} /><Field textarea label="Description" value={item.description} onChange={(value) => updateCms((c) => updateArray(c, "experiences", index, { ...item, description: value }))} /><Field textarea label="Highlights, one per line" value={item.highlights.join("\n")} onChange={(value) => updateCms((c) => updateArray(c, "experiences", index, { ...item, highlights: value.split("\n").filter(Boolean) }))} /></div></Panel>} />;
}

function AchievementsEditor({ cms, updateCms }: EditorProps) {
  return <CollectionEditor title="Achievements" items={cms.achievements} onAdd={() => updateCms((c) => ({ ...c, achievements: [...c.achievements, { title: "New Achievement", date: "", description: "", link: "" }] }))} render={(item, index) => <Panel key={index}><div className="grid gap-4 md:grid-cols-2"><Field label="Title" value={item.title} onChange={(value) => updateCms((c) => updateArray(c, "achievements", index, { ...item, title: value }))} /><Field label="Date" value={item.date} onChange={(value) => updateCms((c) => updateArray(c, "achievements", index, { ...item, date: value }))} /><Field label="Details URL" value={item.link} onChange={(value) => updateCms((c) => updateArray(c, "achievements", index, { ...item, link: value }))} /><Field textarea label="Description" value={item.description} onChange={(value) => updateCms((c) => updateArray(c, "achievements", index, { ...item, description: value }))} /></div></Panel>} />;
}

function BlogsEditor({ cms, updateCms }: EditorProps) {
  return <CollectionEditor title="Blogs" items={cms.blogs} onAdd={() => updateCms((c) => ({ ...c, blogs: [...c.blogs, { title: "New Blog", excerpt: "", date: new Date().toISOString().slice(0, 10), slug: "new-blog" }] }))} render={(item, index) => <Panel key={index}><div className="grid gap-4 md:grid-cols-2"><Field label="Title" value={item.title} onChange={(value) => updateCms((c) => updateArray(c, "blogs", index, { ...item, title: value }))} /><Field label="Slug" value={item.slug} onChange={(value) => updateCms((c) => updateArray(c, "blogs", index, { ...item, slug: value }))} /><Field label="Date" type="date" value={item.date} onChange={(value) => updateCms((c) => updateArray(c, "blogs", index, { ...item, date: value }))} /><Field textarea label="Excerpt" value={item.excerpt} onChange={(value) => updateCms((c) => updateArray(c, "blogs", index, { ...item, excerpt: value }))} /></div></Panel>} />;
}

function ProjectsEditor({ cms, updateCms, uploadFile }: EditorProps) {
  return <CollectionEditor title="Projects" items={cms.projects} onAdd={() => updateCms((c) => ({ ...c, projects: [...c.projects, { title: "New Project", slug: "new-project", description: "", highlights: [], image: "/projects/project-1.png", deploymentUrl: "", sourceCodeUrl: "" }] }))} render={(item, index) => <Panel key={index}><div className="grid gap-4 md:grid-cols-2"><Field label="Title" value={item.title} onChange={(value) => updateCms((c) => updateArray(c, "projects", index, { ...item, title: value }))} /><Field label="Slug" value={item.slug} onChange={(value) => updateCms((c) => updateArray(c, "projects", index, { ...item, slug: value }))} /><Field label="Image URL" value={item.image} onChange={(value) => updateCms((c) => updateArray(c, "projects", index, { ...item, image: value }))} />{uploadFile && <UploadField label="Upload project image" uploadFile={uploadFile} onUploaded={(url) => updateCms((c) => updateArray(c, "projects", index, { ...item, image: url }))} />}<Field label="Deployment URL" value={item.deploymentUrl} onChange={(value) => updateCms((c) => updateArray(c, "projects", index, { ...item, deploymentUrl: value }))} /><Field label="Source code URL" value={item.sourceCodeUrl} onChange={(value) => updateCms((c) => updateArray(c, "projects", index, { ...item, sourceCodeUrl: value }))} /><Field textarea label="Description" value={item.description} onChange={(value) => updateCms((c) => updateArray(c, "projects", index, { ...item, description: value }))} /><Field textarea label="Project Highlights, one per line" value={item.highlights.join("\n")} onChange={(value) => updateCms((c) => updateArray(c, "projects", index, { ...item, highlights: value.split("\n").filter(Boolean) }))} /></div></Panel>} />;
}

function ContactEditor({ cms, updateCms }: EditorProps) {
  return <Panel><div className="grid gap-4 md:grid-cols-2"><Field label="Heading" value={cms.contact.heading} onChange={(value) => updateCms((c) => ({ ...c, contact: { ...c.contact, heading: value } }))} /><Field label="Subheading" value={cms.contact.subheading} onChange={(value) => updateCms((c) => ({ ...c, contact: { ...c.contact, subheading: value } }))} /><Field label="Email" value={cms.contact.email} onChange={(value) => updateCms((c) => ({ ...c, contact: { ...c.contact, email: value } }))} /><Field label="Phone" value={cms.contact.phone} onChange={(value) => updateCms((c) => ({ ...c, contact: { ...c.contact, phone: value } }))} /><Field label="Location" value={cms.contact.location} onChange={(value) => updateCms((c) => ({ ...c, contact: { ...c.contact, location: value } }))} /><Field label="Button label" value={cms.contact.buttonLabel} onChange={(value) => updateCms((c) => ({ ...c, contact: { ...c.contact, buttonLabel: value } }))} /></div></Panel>;
}

function SettingsEditor({ cms, updateCms, uploadFile }: EditorProps) {
  return <div className="space-y-5"><Panel><div className="grid gap-4 md:grid-cols-2"><Field label="SEO title" value={cms.seo.title} onChange={(value) => updateCms((c) => ({ ...c, seo: { ...c.seo, title: value } }))} /><Field label="Site URL" value={cms.seo.url} onChange={(value) => updateCms((c) => ({ ...c, seo: { ...c.seo, url: value } }))} /><Field label="Favicon path" value={cms.seo.favicon} onChange={(value) => updateCms((c) => ({ ...c, seo: { ...c.seo, favicon: value } }))} />{uploadFile && <UploadField label="Upload favicon" uploadFile={uploadFile} onUploaded={(url) => updateCms((c) => ({ ...c, seo: { ...c.seo, favicon: url } }))} />}<Field label="Social image" value={cms.seo.image} onChange={(value) => updateCms((c) => ({ ...c, seo: { ...c.seo, image: value } }))} />{uploadFile && <UploadField label="Upload social image" uploadFile={uploadFile} onUploaded={(url) => updateCms((c) => ({ ...c, seo: { ...c.seo, image: url } }))} />}<Field textarea label="SEO description" value={cms.seo.description} onChange={(value) => updateCms((c) => ({ ...c, seo: { ...c.seo, description: value } }))} /><Field textarea label="Keywords, one per line" value={cms.seo.keywords.join("\n")} onChange={(value) => updateCms((c) => ({ ...c, seo: { ...c.seo, keywords: value.split("\n").filter(Boolean) } }))} /><Field label="Footer copyright name" value={cms.footer.copyrightName} onChange={(value) => updateCms((c) => ({ ...c, footer: { ...c.footer, copyrightName: value } }))} /></div></Panel><ListHeader title="Social media" onAdd={() => updateCms((c) => ({ ...c, socials: [...c.socials, { name: "New Social", icon: "github", link: "" }] }))} />{cms.socials.map((item, index) => <Panel key={index}><div className="grid gap-4 md:grid-cols-3"><Field label="Name" value={item.name} onChange={(value) => updateCms((c) => updateArray(c, "socials", index, { ...item, name: value }))} /><SelectField label="Icon" value={item.icon} options={iconOptions} onChange={(value) => updateCms((c) => updateArray(c, "socials", index, { ...item, icon: value }))} /><Field label="URL" value={item.link} onChange={(value) => updateCms((c) => updateArray(c, "socials", index, { ...item, link: value }))} /></div></Panel>)}</div>;
}

function CollectionEditor<T>({ title, items, onAdd, render }: { title: string; items: T[]; onAdd: () => void; render: (item: T, index: number) => React.ReactNode }) {
  return <div className="space-y-5"><ListHeader title={title} onAdd={onAdd} />{items.map(render)}</div>;
}
