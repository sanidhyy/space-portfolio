import { CERTIFICATES } from "@/constants";
import { CertificateCard } from "@/components/sub/certificate-card";
export const Certificate = () => {
  return (
    <section
      id="projects"
      className="max-w-7xl flex flex-col items-center justify-center py-20 mx-auto"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Certificate
      </h1>
      <div className="h-full w-full grid grid-cols-1 lg:grid-cols-3 gap-10 px-10">
        {CERTIFICATES.map((certificate, idx) => (
          <CertificateCard
            src={certificate.image}
            title={certificate.title}
            link={certificate.link}
            key={idx}
          />
        ))}
      </div>
    </section>
  );
};
