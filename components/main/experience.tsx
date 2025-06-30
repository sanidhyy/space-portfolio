// BACKUP STORAGE - components/premium-experience.tsx 
// This is your sexy component - DON'T DELETE THIS!

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const workExperience = [
  {
    id: 1,
    title: "Frontend Engineer Intern",
    desc: "Assisted in the development of a web-based platform using React.js, enhancing interactivity.",
    thumbnail: "/exp1.svg",
    gradient: "from-purple-500/20 via-pink-500/20 to-red-500/20",
    glowColor: "shadow-purple-500/50",
  },
  {
    id: 2,
    title: "Mobile App Dev - JSM Tech",
    desc: "Designed and developed mobile app for both iOS & Android platforms using React Native.",
    thumbnail: "/exp2.svg",
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    glowColor: "shadow-blue-500/50",
  },
  {
    id: 3,
    title: "Freelance App Dev Project",
    desc: "Led the dev of a mobile app for a client, from initial concept to deployment on app stores.",
    thumbnail: "/exp3.svg",
    gradient: "from-emerald-500/20 via-green-500/20 to-lime-500/20",
    glowColor: "shadow-emerald-500/50",
  },
  {
    id: 4,
    title: "Lead Frontend Developer",
    desc: "Developed and maintained user-facing features using modern frontend technologies.",
    thumbnail: "/exp4.svg",
    gradient: "from-orange-500/20 via-yellow-500/20 to-amber-500/20",
    glowColor: "shadow-orange-500/50",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.8,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

const ExperienceCard = ({ experience, index }: { experience: typeof workExperience[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-500 animate-pulse" />
      
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
          rotateY: isHovered ? 2 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-gradient-to-br ${experience.gradient} hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 transition-all duration-500 ${experience.glowColor} hover:shadow-2xl`}
      >
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6">
          <motion.div
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ 
              rotate: { duration: 0.8, ease: "easeInOut" },
              scale: { duration: 0.3 }
            }}
            className="relative"
          >
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-all duration-500">
              <Image
                src={experience.thumbnail}
                alt={experience.title}
                width={40}
                height={40}
                className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
              />
            </div>
            
            <div className="absolute inset-0 rounded-2xl border-2 border-purple-500/0 group-hover:border-purple-500/50 group-hover:animate-ping" />
          </motion.div>

          <div className="flex-1 space-y-3">
            <motion.h3 
              animate={{
                color: isHovered ? "#e879f9" : "#ffffff",
              }}
              className="text-xl lg:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300"
            >
              {experience.title}
            </motion.h3>
            
            <motion.p 
              animate={{
                color: isHovered ? "#e5e7eb" : "#9ca3af",
              }}
              className="text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors duration-300"
            >
              {experience.desc}
            </motion.p>

            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : "30%" }}
              className="h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl"
        />
      </motion.div>
    </motion.div>
  );
};

export const PremiumExperience = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
              Work Experience
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {workExperience.map((experience, index) => (
            <ExperienceCard 
              key={experience.id} 
              experience={experience} 
              index={index}
            />
          ))}
        </motion.div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-purple-500/20 to-transparent blur-3xl" />
      </div>
    </section>
  );
};

