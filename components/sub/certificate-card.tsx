import Image from "next/image";
import Link from "next/link";


type CertificateCardProps = {
  src: string;
  title: string;
  link: string;
};

export const CertificateCard = ({
  src,
  title,
  link,
}: CertificateCardProps) => {
  return (
    <div
      className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
    >
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
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
        </div>
      </Link>
    </div>
  );
};
