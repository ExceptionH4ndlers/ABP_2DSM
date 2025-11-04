import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import React from "react";

interface PageTransitionProps {
  children: React.ReactNode;
  direction?: "left" | "right"; // apenas horizontal para efeito mais visível
  duration?: number;
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  direction = "right",
  duration = 0.5, // um pouco mais lento para notar a transição
}) => {
  const variants: Variants = {
    initial: { opacity: 0, x: direction === "right" ? 100 : -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: direction === "right" ? -100 : 100 },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration, ease: "easeInOut" }}
      style={{ minHeight: "100vh" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
