import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)
  const ringX = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 })
  const ringY = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const rawRingX = ringX.get === undefined ? { set: (v) => ringX.set(v) } : ringX
    const rawRingY = ringY.get === undefined ? { set: (v) => ringY.set(v) } : ringY

    const move = (e) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const enter = () => setHovering(true)
    const leave = () => setHovering(false)

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [])

  if (!visible) return null

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ left: dotX, top: dotY }}
      />
      <motion.div
        className={`cursor-ring ${hovering ? 'hovering' : ''}`}
        style={{ left: ringX, top: ringY }}
      />
    </>
  )
}
