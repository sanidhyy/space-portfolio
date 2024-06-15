import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { slideIn, zoomIn } from "../utils/motion";


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
    <motion.div
      variants={zoomIn(0.2, 1)}
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
    </motion.div>
  );
};
