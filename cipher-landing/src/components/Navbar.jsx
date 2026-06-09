import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Shield, Menu, X } from 'lucide-react'

const links = ['Platform', 'Security', 'Pricing', 'Docs', 'Blog']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 40))
  }, [scrollY])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-300 ${
        scrolled ? 'glass-strong shadow-2xl' : 'glass'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group" data-hover>
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            CIPHER<span className="text-blue-400">_</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200 tracking-wide"
              data-hover
            >
              {l}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-sm text-slate-300 hover:text-white px-4 py-2 transition-colors" data-hover>
            Log in
          </a>
          <a
            href="#"
            className="btn-press text-sm font-semibold px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-blue-900/30"
            data-hover
          >
            Start Free Trial
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-hover
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="md:hidden overflow-hidden"
      >
        <div className="px-6 pb-5 flex flex-col gap-4 border-t border-white/5 pt-4">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-slate-300 hover:text-white transition-colors" onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <a href="#" className="btn-press mt-2 text-center py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-sm">
            Start Free Trial
          </a>
        </div>
      </motion.div>
    </motion.nav>
  )
}
