"use client";

import { motion } from "motion/react";
import type { ComponentProps } from "react";

type RevealProps = ComponentProps<typeof motion.div> & {
  delay?: number;
  blur?: boolean;
};

export const Reveal = ({ children, delay = 0, blur = true, className = "", ...props }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24, filter: blur ? "blur(10px)" : "blur(0px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);
