import { motion } from "framer-motion";

import { styles } from "../styles";
import { cn } from "../utils/lib";
import { staggerContainer } from "../utils/motion";

type SectionWrapperProps = {
  children: React.ReactNode;
  idName?: string;
};

export const SectionWrapper = ({ children, idName }: SectionWrapperProps) => (
  <div className="relative z-0">
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={cn(styles.padding, "sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0")}
    >
      <span className="hash-span" id={idName} >
        &nbsp;
      </span>
      {children}
    </motion.section>
  </div>

);
