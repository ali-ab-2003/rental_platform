// Shared Framer Motion configurations for consistent luxury feel

// Spring physics: slow, heavy, premium
export const spring = {
  slow: { type: "spring" as const, stiffness: 70, damping: 20 },
  default: { type: "spring" as const, stiffness: 100, damping: 20 },
  snappy: { type: "spring" as const, stiffness: 150, damping: 15 },
};

// Transition durations (for tweens)
export const duration = {
  fast: 0.3,
  default: 0.6,
  slow: 0.9,
  verySlow: 1.2,
};

// Common variants
export const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.slow, ease: "easeOut" as const } },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: spring.slow },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  },
};
