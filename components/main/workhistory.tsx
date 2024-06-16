"use client";


import { motion } from "framer-motion";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { WORKHISTORY } from "@/constants";
import { SectionWrapper } from "../hoc";
import { textVariant, zoomIn } from "../utils/motion";

import "react-vertical-timeline-component/style.min.css";

type ExperienceCardProps = {
    experience: (typeof WORKHISTORY)[number];
};

// Experience Card
const ExperienceCard = ({ experience }: ExperienceCardProps) => (
    <div className="flex flex-row gap-4 bg-black-100 rounded-md p-5"
    >
        <div className="flex justify-center items-center flex-shrink-0 w-24 h-24 p-1 rounded-full bg-purple-950">
            <img
                src={experience.icon}
                alt={experience.company_name}
                className="w-[80%] h-[80%] object-contain rounded-full"
            />
        </div>
        {/* Title */}
        <div className="flex flex-col">
            <div className="flex flex-col">
                <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
                <p
                    className="text-secondary text-[16px] font-semibold"
                    style={{ margin: 0 }}
                >
                    {experience.company_name}
                    <span className="text-secondary text-md ml-4">({experience.date})</span>
                </p>
            </div>

            {/* Experience Points */}
            <ul className="mt-5 list-disc ml-5 space-y-2">
                {experience.points.map((point, i) => (
                    <li
                        key={`experience-point-${i}`}
                        className="text-white-100 text-[14px] pl-1 tracking-wider"
                    >
                        {point}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

// Experience
export const WorkHistory = () => {
    return (
        <SectionWrapper idName="work">
            <div className="flex flex-row">
                {/* Title */}
                <motion.div variants={zoomIn(0.2, 1)}>
                    <div className="w-px bg-white"></div>
                </motion.div>

                {/* Experience Card */}
                <div className="flex flex-col gap-6">
                        {WORKHISTORY.map((experience, i) => (
                            <ExperienceCard key={i} experience={experience} />
                        ))}
                </div>
            </div>
        </SectionWrapper>
    );
};
