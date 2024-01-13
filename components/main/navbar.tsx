import Image from "next/image";
import Link from "next/link";

import { SOCIALS } from "@/constants";

export const Navbar = () => {
  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <Link
          href="#about-me"
          className="h-auto w-auto flex flex-row items-center"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={70}
            height={70}
            draggable={false}
            className="cursor-pointer hover:animate-slowspin"
          />
          <div className="font-bold ml-[10px] hidden md:block text-gray-300">
            WebChain Dev
          </div>
        </Link>

        <div className="w-[500px] h-full flex flex-row items-center justify-between md:mr-20">
          <div className="flex items-center justify-between w-full h-auto border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            <Link
              href="#about-me"
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
            >
              About me
            </Link>
            <Link
              href="#skills"
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
            >
              Skills
            </Link>
            <Link
              href="#projects"
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
            >
              Projects
            </Link>
          </div>
        </div>

        <div className="flex flex-row gap-5">
          {SOCIALS.map((social) => (
            <Link
              href={social.link}
              target="_blank"
              rel="noreferrer noopener"
              key={social.name}
            >
              <Image
                src={social.src}
                alt={social.name}
                width={24}
                height={24}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
