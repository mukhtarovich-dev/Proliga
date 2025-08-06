export const eventVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      type: 'spring',
      stiffness: 75,
    },
  }),
}

export const refreshButtonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 200,
      damping: 10,
    },
  },
  hover: {
    scale: 1.15,
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.9 },
}
