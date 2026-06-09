import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Cpu, Eye, Lock, Zap, Globe, Database, GitBranch } from 'lucide-react'

const features = [
  {
    icon: Cpu,
    color: 'blue',
    title: 'AI Threat Intelligence',
    desc: 'Machine learning models trained on 10B+ signals detect unknown threats before they escalate.',
    badge: 'ML-Powered',
  },
  {
    icon: Eye,
    color: 'violet',
    title: 'Real-Time Monitoring',
    desc: 'Full visibility across your entire infrastructure — cloud, on-premise, and hybrid environments.',
    badge: '24/7 Active',
    wide: true,
  },
  {
    icon: Lock,
    color: 'emerald',
    title: 'Zero-Trust Access',
    desc: 'Verify every identity, every device, every time. No implicit trust anywhere in your network.',
    badge: 'NIST Compliant',
    tall: true,
  },
  {
    icon: Zap,
    color: 'yellow',
    title: 'Automated Response',
    desc: 'Playbooks execute in milliseconds, isolating threats before humans can react.',
    badge: '<50ms',
  },
  {
    icon: Globe,
    color: 'blue',
    title: 'Global Threat Map',
    desc: 'Live intelligence from 190+ countries powering your defense posture.',
    badge: 'Live Intel',
  },
  {
    icon: Database,
    color: 'violet',
    title: 'Encrypted Vault',
    desc: 'AES-256 encryption with customer-managed keys. Your data stays yours.',
    badge: 'AES-256',
  },
  {
    icon: GitBranch,
    color: 'emerald',
    title: 'DevSecOps Pipeline',
    desc: 'Shift security left. Scan every commit, container, and dependency automatically.',
    badge: 'CI/CD Native',
    wide: true,
  },
]

const colorMap = {
  blue:   { bg: 'rgba(59,130,246,0.1)',   border: 'rgba(59,130,246,0.25)',  text: '#60a5fa',  glow: 'rgba(59,130,246,0.06)' },
  violet: { bg: 'rgba(124,58,237,0.1)',   border: 'rgba(124,58,237,0.25)', text: '#a78bfa',  glow: 'rgba(124,58,237,0.06)' },
  emerald:{ bg: 'rgba(52,211,153,0.08)',  border: 'rgba(52,211,153,0.2)',  text: '#34d399',  glow: 'rgba(52,211,153,0.05)' },
  yellow: { bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.2)',  text: '#fbbf24',  glow: 'rgba(251,191,36,0.05)' },
}

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const c = colorMap[feature.color]

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16
    e.currentTarget.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) translateZ(4px)`
  }
  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    e.currentTarget.style.transition = 'transform 0.4s cubic-bezier(0.23,1,0.32,1)'
  }
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transition = 'transform 0.1s cubic-bezier(0.23,1,0.32,1)'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`card-3d relative glass rounded-2xl p-6 cursor-default overflow-hidden
        ${feature.wide ? 'md:col-span-2' : ''}
        ${feature.tall ? 'row-span-2' : ''}
      `}
      style={{
        borderColor: inView ? c.border : 'transparent',
        transition: 'border-color 0.6s ease',
      }}
      data-hover
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, ${c.glow} 0%, transparent 70%)` }}
      />

      {/* Icon */}
      <div className="relative inline-flex mb-5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: c.bg, border: `1px solid ${c.border}` }}
        >
          <feature.icon className="w-5 h-5" style={{ color: c.text }} strokeWidth={1.8} />
        </div>
        <div className="absolute inset-0 rounded-xl blur-md" style={{ background: c.bg }} />
      </div>

      {/* Badge */}
      <span
        className="absolute top-5 right-5 text-xs font-mono px-2.5 py-1 rounded-full"
        style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
      >
        {feature.badge}
      </span>

      <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>

      {feature.tall && (
        <div className="mt-6 space-y-2">
          {['Identity Verification', 'Device Posture', 'Network Segmentation', 'Least Privilege'].map((item) => (
            <div key={item} className="flex items-center gap-2.5 text-sm text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.text }} />
              {item}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default function Features() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-100px' })

  return (
    <section id="platform" className="relative py-32 overflow-hidden">
      {/* BG accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" aria-hidden />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">Platform</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            <span className="text-gradient-white">Security that</span>{' '}
            <span className="text-gradient">thinks ahead.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
            Every layer of your stack protected by intelligence that evolves with the threat landscape.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
