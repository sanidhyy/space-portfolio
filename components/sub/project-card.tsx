import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  src: string;
  title: string;
  type: string;
  role: string;
  description: string;
  link: string;
};

export const ProjectCard = ({
  src,
  title,
  type,
  role,
  description,
  link,
}: ProjectCardProps) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61]"
    >
      <Image
        src={src}
        alt={title}
        width={1000}
        height={1000}
        className="w-full object-contain"
      />

      <div className="relative p-4">
        <h1 className="text-2xl font-semibold text-white capitalize">{title}</h1>
        <p className="text-purple-200"># {type} project</p>
        <p className="italic text-secondary">Role: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">{role}</span></p>
        <p className="mt-2 text-gray-300">{description}</p>
      </div>
    </Link>
  );
};
