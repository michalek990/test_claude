import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CISO, Vertex Technologies',
    avatar: 'https://i.pravatar.cc/64?img=5',
    stars: 5,
    text: 'CIPHER reduced our mean time to detect from 14 days to under 3 minutes. The AI correlation engine is genuinely transformative — it sees attack paths our team missed entirely.',
    company: 'Vertex',
  },
  {
    name: 'Marcus Reid',
    role: 'VP of Engineering, NovaPay',
    avatar: 'https://i.pravatar.cc/64?img=8',
    stars: 5,
    text: 'We process $2B in transactions daily. CIPHER\'s zero-trust implementation and fraud detection have been flawless. We\'ve had zero security incidents since deployment.',
    company: 'NovaPay',
    featured: true,
  },
  {
    name: 'Dr. Aiko Tanaka',
    role: 'Head of InfoSec, BioMedica Labs',
    avatar: 'https://i.pravatar.cc/64?img=9',
    stars: 5,
    text: 'HIPAA compliance was always a headache. CIPHER automated 94% of our compliance reporting and the audit trail is immaculate. Our auditors were impressed.',
    company: 'BioMedica',
  },
]

const logos = ['AWS', 'Google Cloud', 'Azure', 'Cloudflare', 'Okta', 'CrowdStrike', 'Datadog', 'Palo Alto']

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" aria-hidden />

      <div className="max-w-7xl mx-auto px-6">
        {/* Logo strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-24"
          ref={ref}
        >
          <p className="text-center text-xs font-mono text-slate-600 tracking-widest uppercase mb-8">
            Trusted by security-first companies worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {logos.map((logo) => (
              <span key={logo} className="text-slate-600 font-semibold text-sm tracking-wide hover:text-slate-400 transition-colors duration-200">
                {logo}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="text-gradient-white">Loved by</span>{' '}
            <span className="text-gradient">security teams.</span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto">
            From startups to Fortune 500 — teams trust CIPHER to protect what matters most.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className={`relative glass rounded-2xl p-6 flex flex-col gap-4 ${
                t.featured ? 'md:scale-[1.02] ring-1 ring-violet-500/30 glow-purple' : ''
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-mono px-3 py-1 rounded-full bg-violet-600 text-white">
                  ★ Most Cited
                </div>
              )}

              <Quote className="w-6 h-6 text-blue-500/40" />

              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed flex-1">"{t.text}"</p>

              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
