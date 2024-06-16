import { FaYoutube, FaFacebook } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

export const SKILL_DATA = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
] as const;

export const SOCIALS = [
  {
    name: "Github",
    icon: RxGithubLogo,
    link: "https://github.com/king-mufasa",
  },
  {
    name: "Discord",
    icon: RxDiscordLogo,
    link: "https://discord.com",
  },
  {
    name: "Twitter",
    icon: RxTwitterLogo,
    link: "https://twitter.com",
  },
] as const;

export const FRONTEND_SKILL = [
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express.js",
    image: "express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Firebase",
    image: "firebase.png",
    width: 55,
    height: 55,
  },
  {
    skill_name: "PostgreSQL",
    image: "postgresql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
] as const;

export const FULLSTACK_SKILL = [
  {
    skill_name: "React Native",
    image: "reactnative.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const OTHER_SKILL = [
  {
    skill_name: "Go",
    image: "go.png",
    width: 60,
    height: 60,
  },
] as const;

export const PROJECTS = [
  {
    title: "Rabbitff",
    type:"NFT game",
    role:"Frontend Dev",
    description:
      `Webinars and workshops on AI, Web3, and their applications, catering to curious minds and enthusiasts in the AI and Web3 space.
      A platform to collaborate, network, and grow alongside fellow AI and Web3 enthusiasts.`,
    image: "/projects/project-2.png",
    link: "https://rabbitff.com/",
  },
  {
    title: "koingames",
    type:"NFT game",
    role:"Frontend Dev && Contract",
    description:
      `Koin Games is a team of multi-decade game industry veterans, entrepreneurs, and blockchain natives on a mission to show the world how to bridge the gap between traditional games and blockchain games.`,
    image: "/projects/project-3.png",
    link: "https://koingames.io/",
  },
  {
    title: "Heroesandvillains",
    type:"NFT game",
    role:"Frontend Dev && Contract",
    description:
      `Campaign/Story, Recruit, Train, Clone Lab and an expansive in-game marketplace. Upcoming features introduce PVP, a Rental Program, Teams, Headquarters and much, much more!.`,
    image: "/projects/project-4.png",
    link: "https://heroesandvillains.io/",
  },
  {
    title: "whelps",
    type:"NFT game",
    role:"Frontend Dev",
    description:
      `Slipstream is an upcoming Play, Earn & Own battle racing video game powered by blockchain technology and developed by MasterBrews & Argentics Studios.`,
    image: "/projects/project-5.png",
    link: "https://whelps.io/",
  },
] as const;

export const CERTIFICATES = [
  {
    title: "HTML",
    image: "/certificate/HTML.jpg",
    link: "https://verify.mygreatlearning.com/IQODKWRH"
  },
  {
    title: "CSS",
    image: "/certificate/CSS.jpg",
    link: "https://verify.mygreatlearning.com/DBSNHJIR"
  },
  {
    title: "Javascript",
    image: "/certificate/Javascript.jpg",
    link: "https://verify.mygreatlearning.com/ODXNLBVS"
  },
  {
    title: "Block Chain",
    image: "/certificate/Block Chain.jpg",
    link: "https://verify.mygreatlearning.com/IMFWZYUO"
  },
  {
    title: "React",
    image: "/certificate/react.jpg",
    link: "https://www.hackerrank.com/certificates/340a53bf426a?test_finished=true"
  },
  {
    title: "Android",
    image: "/certificate/Android.jpg",
    link: "https://verify.mygreatlearning.com/LPSIKUJN"
  },
] as const;


export const WORKHISTORY = [
  {
    title: "Frontend & Web3 Developer",
    company_name: "Masterbrew",
    icon: "/company/masterbrews.webp",
    iconBg: "#383E56",
    date: "Jan 2022 - Jan 2023",
    points: [
      "Developing and managing NFT marketplace projects",
      "Built NFT Game and NFT marketplace, Staking, Vesting, Pool and etc.",
      "Built Front-end for Dapp using React.js and Next.js.",
      "Generating NFT images and Minting Website using Image processing technology and Dapp Stack.",
      "Developed smart contracts and integrated them with web apps using React.js, Solidity, and Web3.js.",
      "Using the Hardhat, optimized the smart contract program and boosted performance by 35%.",
      "Had the responsibility to train 3 people on the front-end basics and helped them develop further."
    ],
  },
  {
    title: "enior Software Development Engineer",
    company_name: "新潟営業所",
    icon: '/company/build.png',
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Manage company management system.",
      "Consulted with engineering team members to determine system loads and develop improvement plans.",
      "Reviewed code, debugged problems and corrected issues.",
      "Discussed project progress with customers, collected feedback on different stages and directly addressed concerns.",
      "Managed development milestones from initial steps through final delivery.",
      "Adjusted design parameters to incorporate new features."
    ],
  },
  {
    title: "Software Developer",
    company_name: "JCCソフト（株）新潟事業所",
    icon: "/company/JCC.png",
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: [
      "Native Android Application",
      "Maintain Stuff management system",
      "Successfully managed 20K + budget project"
    ],
  },

] as const;

export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "YouTube",
        icon: FaYoutube,
        link: "https://youtube.com",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com",
      },
      {
        name: "Discord",
        icon: RxDiscordLogo,
        link: "https://discord.com",
      },
    ],
  },
  {
    title: "Social Media",
    data: [
      {
        name: "Instagram",
        icon: RxInstagramLogo,
        link: "https://instagram.com",
      },
      {
        name: "Twitter",
        icon: RxTwitterLogo,
        link: "https://twitter.com",
      },
      {
        name: "Linkedin",
        icon: RxLinkedinLogo,
        link: "https://linkedin.com",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "Become Sponsor",
        icon: null,
        link: "https://youtube.com",
      },
      {
        name: "Learning about me",
        icon: null,
        link: "https://example.com",
      },
      {
        name: "Contact Me",
        icon: null,
        link: "mailto:contact@example.com",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Contact",
    link: "#contact",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/sanidhyy/space-portfolio",
};
