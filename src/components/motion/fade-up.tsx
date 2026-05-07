"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { variants } from "./presets";

interface FadeUpProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  once?: boolean;
}

export function FadeUp({
  children,
  delay = 0,
  once = true,
  className,
  ...props
}: FadeUpProps) {
  return (
    <motion.div
      variants={variants.fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
