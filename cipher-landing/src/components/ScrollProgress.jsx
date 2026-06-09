import { useScroll, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[100]"
      aria-hidden="true"
    >
      <div className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-400" />
    </motion.div>
  )
}
