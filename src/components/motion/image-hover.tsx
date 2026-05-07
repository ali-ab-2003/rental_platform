"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ImageHoverProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  scale?: number;
}

export function ImageHover({
  children,
  scale = 1.03,
  className,
  ...props
}: ImageHoverProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }} // Custom smooth ease
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
