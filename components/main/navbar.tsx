'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useCosmicSettings } from "@/contexts/cosmic-context";

// You'll need to update your constants file with this structure
const NAV_LINKS = [
  { title: "About", link: "/about" },
  { title: "Skills", link: "/skills" },
  { 
    title: "Research", 
    link: "/research",
    dropdown: [
      { title: "Research Domains", link: "/research/domains" },
      { title: "Publications", link: "/research/publications" },
      { title: "Ongoing Research", link: "/research/ongoing" }
    ]
  },
  { title: "Cosmic Play", link: "/cosmic-play", special: true },
  { 
    title: "Projects", 
    link: "/projects",
    dropdown: [
      { title: "QuantBoX", link: "/projects/quantbox" },
      { title: "AutoAnalytiX", link: "/projects/autoanaytix" },
      { title: "separator", link: "#" },
      { title: "All Projects", link: "/projects" }
    ]
  },
  { title: "Experience", link: "/experience" },
  { title: "Contact", link: "/contact" }
];

const SOCIALS = [
  // Your social links here
];

export const Navbar = () => {
  const settings = useCosmicSettings(); // Add this line
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  return (
    <div className="w-full h-[80px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-10">
      {/* Navbar Container */}
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        {/* Logo + Name */}
        <Link
          href="/"
          className="flex items-center"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={75}
            height={75}
            draggable={false}
            className="cursor-pointer"
          />
          <div className="hidden md:flex font-bold ml-[10px] text-white text-lg">
            Priyansh Singhal
          </div>
        </Link>

        {/* Web Navbar */}
        <div className="hidden md:flex w-auto h-full flex-row items-center justify-center">
          <div className="flex items-center justify-between h-auto border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] px-[25px] py-[12px] rounded-full text-white">
            {NAV_LINKS.map((link) => (
              <div key={link.title} className="relative group">
                {link.dropdown ? (
                  // Dropdown Navigation Item
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(link.title)}
                      className="cursor-pointer hover:text-[rgb(112,66,248)] transition flex items-center gap-1 mx-3 text-base font-medium"
                    >
                      {link.title}
                      <ChevronDownIcon 
                        className={`h-4 w-4 transition-transform ${
                          activeDropdown === link.title ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {activeDropdown === link.title && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-[rgba(3,0,20,0.95)] backdrop-blur-md border border-[rgba(112,66,248,0.3)] rounded-lg shadow-lg">
                        {link.dropdown.map((dropdownItem, index) => (
                          dropdownItem.title === "separator" ? (
                            <div key={index} className="border-t border-[rgba(112,66,248,0.3)] my-1" />
                          ) : (
                            <Link
                              key={dropdownItem.title}
                              href={dropdownItem.link}
                              className="block px-4 py-3 text-sm text-gray-200 hover:text-[rgb(112,66,248)] hover:bg-[rgba(112,66,248,0.1)] transition"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {dropdownItem.title}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ) : link.special ? (
                  // Special Cosmic Play Button
                  <button
                    onClick={() => settings.setModalOpen(true)}
                    className={`cursor-pointer transition mx-3 text-base font-medium text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text hover:from-purple-300 hover:via-pink-400 hover:to-red-400 font-bold text-lg animate-pulse`}
                  >
                    {link.title}
                  </button>
                ) : (
                  // Regular Navigation Item
                  <Link
                    href={link.link}
                    className="cursor-pointer transition mx-3 text-base font-medium text-white hover:text-[rgb(112,66,248)]"
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Social Icons (Web) */}
        <div className="hidden md:flex flex-row gap-5">
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
              className="hover:scale-110 transition-transform"
            >
              <Icon className="h-6 w-6 text-white hover:text-[rgb(112,66,248)]" />
            </Link>
          ))}
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-white focus:outline-none text-4xl hover:text-[rgb(112,66,248)] transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-[#030014] p-6 flex flex-col items-center text-white md:hidden border-t border-[rgba(112,66,248,0.3)]">
          {/* Links */}
          <div className="flex flex-col items-center gap-5">
            {NAV_LINKS.map((link) => (
              <div key={link.title} className="text-center">
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => handleDropdownToggle(link.title)}
                      className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-center text-lg font-medium flex items-center gap-1"
                    >
                      {link.title}
                      <ChevronDownIcon className="h-4 w-4" />
                    </button>
                    {activeDropdown === link.title && (
                      <div className="mt-2 flex flex-col gap-2">
                        {link.dropdown.map((dropdownItem, index) => (
                          dropdownItem.title === "separator" ? (
                            <div key={index} className="border-t border-[rgba(112,66,248,0.3)] my-1" />
                          ) : (
                            <Link
                              key={dropdownItem.title}
                              href={dropdownItem.link}
                              className="text-sm text-gray-300 hover:text-[rgb(112,66,248)] transition"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              {dropdownItem.title}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ) : link.special ? (
                  <button
                    onClick={() => {
                      settings.setModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="cursor-pointer transition text-lg font-medium text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text font-bold text-xl animate-pulse"
                  >
                    {link.title}
                  </button>
                ) : (
                  <Link
                    href={link.link}
                    className="cursor-pointer transition text-lg font-medium text-white hover:text-[rgb(112,66,248)]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mt-6">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                key={name}
                className="hover:scale-110 transition-transform"
              >
                <Icon className="h-8 w-8 text-white hover:text-[rgb(112,66,248)]" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};