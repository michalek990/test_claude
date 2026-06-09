import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, Zap } from 'lucide-react'

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: 2 + Math.random() * 4,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 6,
  color: ['#3b82f6', '#8b5cf6', '#34d399', '#60a5fa'][Math.floor(Math.random() * 4)],
}))

function ThreatOrb() {
  return (
    <div className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]">
      {/* Pulse rings */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-blue-500/20"
          style={{
            animation: `pulse-ring 3s ease-out ${i * 0.8}s infinite`,
          }}
        />
      ))}

      {/* Outer ring */}
      <div
        className="absolute inset-4 rounded-full border border-blue-500/10"
        style={{ animation: 'spin-slow 20s linear infinite' }}
      >
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <div
            key={angle}
            className="absolute w-2 h-2 rounded-full bg-blue-400/60"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${angle}deg) translateX(186px) translateY(-50%)`,
            }}
          />
        ))}
      </div>

      {/* Inner ring */}
      <div
        className="absolute inset-16 rounded-full border border-violet-500/15"
        style={{ animation: 'spin-reverse 15s linear infinite' }}
      >
        {[0, 90, 180, 270].map((angle) => (
          <div
            key={angle}
            className="absolute w-1.5 h-1.5 rounded-full bg-violet-400/70"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${angle}deg) translateX(120px) translateY(-50%)`,
            }}
          />
        ))}
      </div>

      {/* Core orb */}
      <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-blue-600/40 via-violet-600/30 to-emerald-500/20 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 blur-xl" />
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-blue-500/40">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
      </div>

      {/* Floating data nodes */}
      {[
        { top: '8%', left: '60%', label: 'ENCRYPTED', color: 'emerald' },
        { top: '75%', left: '70%', label: 'THREAT BLOCKED', color: 'blue' },
        { top: '60%', left: '2%', label: 'SCANNING', color: 'violet' },
      ].map(({ top, left, label, color }) => (
        <div
          key={label}
          className={`absolute glass rounded-lg px-3 py-1.5 text-xs font-mono font-medium tracking-wider text-${color}-400 border border-${color}-500/20`}
          style={{ top, left }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle"
            style={{
              background: color === 'emerald' ? '#34d399' : color === 'blue' ? '#60a5fa' : '#a78bfa',
              animation: 'blink 1.5s ease infinite',
            }}
          />
          {label}
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-lines pt-24"
    >
      {/* Scanline */}
      <div className="scanline" aria-hidden />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-600/5 rounded-full blur-[80px]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              bottom: 0,
              width: p.size,
              height: p.size,
              background: p.color,
              animation: `float-up ${p.duration}s ease-in-out ${p.delay}s infinite`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy */}
          <motion.div style={{ y, opacity }} className="flex flex-col gap-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="inline-flex items-center gap-2 self-start"
            >
              <div className="flex items-center gap-2 glass px-3.5 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'blink 2s ease infinite' }} />
                <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">Zero-Trust Security</span>
                <span className="text-xs text-slate-500 font-mono">v4.2.0</span>
              </div>
              <div className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-slate-300 font-mono">SOC 2 Type II</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="text-5xl lg:text-7xl font-bold leading-[1.04] tracking-tight"
            >
              <span className="text-gradient-white">Defend your</span>
              <br />
              <span className="text-gradient">digital</span>
              <br />
              <span className="text-gradient-white">perimeter.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="text-lg text-slate-400 max-w-md leading-relaxed"
            >
              CIPHER provides AI-powered threat detection, zero-trust access control,
              and real-time incident response — all in one unified security platform.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#platform"
                className="btn-press group flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-sm shadow-xl shadow-blue-900/40 hover:shadow-blue-900/60 hover:from-blue-500 hover:to-violet-500 transition-all duration-200"
                data-hover
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
              <a
                href="#demo"
                className="btn-press flex items-center gap-2.5 px-7 py-3.5 rounded-xl glass text-slate-200 font-semibold text-sm hover:border-blue-500/30 transition-all duration-200"
                data-hover
              >
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 text-white fill-white" />
                </div>
                Watch Demo
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-5 pt-2"
            >
              <div className="flex -space-x-2.5">
                {[
                  'https://i.pravatar.cc/32?img=1',
                  'https://i.pravatar.cc/32?img=2',
                  'https://i.pravatar.cc/32?img=3',
                  'https://i.pravatar.cc/32?img=4',
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-[#020408] object-cover" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Trusted by <span className="text-slate-300 font-medium">4,200+</span> security teams
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <ThreatOrb />
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden"
        >
          {[
            { value: '99.99%', label: 'Uptime SLA', color: 'emerald' },
            { value: '<50ms', label: 'Threat Detection', color: 'blue' },
            { value: '10B+', label: 'Events Analyzed Daily', color: 'violet' },
            { value: '0', label: 'Data Breaches Reported', color: 'emerald' },
          ].map(({ value, label, color }) => (
            <div key={label} className="glass py-7 px-6 text-center">
              <div className={`text-2xl lg:text-3xl font-bold font-mono text-${color}-400 mb-1`}>{value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020408] to-transparent pointer-events-none" aria-hidden />
    </section>
  )
}
