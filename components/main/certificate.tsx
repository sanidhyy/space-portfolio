"use client";

import { useState } from 'react'
import { CERTIFICATES } from "@/constants";
import { CertificateCard } from "@/components/sub/certificate-card";
import { AnimatePresence, motion } from "framer-motion";
import Link from 'next/link';
export const Certificate = () => {

  const [selectedId, setSelectedId] = useState(null)

  return (
    <section
      id="projects"
      className="max-w-7xl flex flex-col items-center justify-center py-20 mx-auto"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>
      <div className="h-full w-full grid grid-cols-1 lg:grid-cols-3 gap-10 px-10">
        {CERTIFICATES.map((certificate, idx) => (
          <CertificateCard
            src={certificate.image}
            title={certificate.title}
            link={certificate.link}
            onClick={() => setSelectedId(idx)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div layoutId={selectedId}>
            <Link
              href={CERTIFICATES[selectedId].link}
              target="_blank"
              rel="noreferrer noopener">
              <CertificateCard
                src={CERTIFICATES[selectedId].image}
                title={CERTIFICATES[selectedId].title}
                link={CERTIFICATES[selectedId].link}
                onClick={() => setSelectedId(null)}
              />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
