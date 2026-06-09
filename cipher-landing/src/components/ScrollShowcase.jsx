import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Terminal, Shield, AlertTriangle, CheckCircle, Activity } from 'lucide-react'

const STEPS = [
  {
    id: 'detect',
    icon: Activity,
    color: 'blue',
    step: '01',
    title: 'Continuous Detection',
    subtitle: 'Every packet. Every endpoint.',
    desc: 'CIPHER ingests over 10 billion signals daily from every layer of your infrastructure. Our AI baseline learns what normal looks like — and flags everything that isn\'t.',
    tags: ['Behavioral Analytics', 'UEBA', 'Network Flow Analysis'],
    terminal: [
      '$ cipher scan --target production',
      '> Connecting to 847 endpoints...',
      '> Analyzing 2.3M events/sec',
      '> Baseline deviation: none',
      '> Status: ✓ NOMINAL',
    ],
  },
  {
    id: 'analyze',
    icon: Terminal,
    color: 'violet',
    step: '02',
    title: 'AI-Powered Analysis',
    subtitle: 'Signal from noise.',
    desc: 'Our transformer-based threat models correlate indicators across time and space. What looks like noise to humans looks like a clear attack path to CIPHER.',
    tags: ['ML Correlation', 'Attack Path Mapping', 'TTP Recognition'],
    terminal: [
      '$ cipher analyze --event 0xA3F9',
      '> Cross-referencing threat intel...',
      '> ATT&CK mapping: T1059.001',
      '> Confidence: 97.3%',
      '> ALERT: Lateral movement detected',
    ],
  },
  {
    id: 'respond',
    icon: Shield,
    color: 'emerald',
    step: '03',
    title: 'Automated Response',
    subtitle: 'Faster than any human.',
    desc: 'When a threat is confirmed, CIPHER executes pre-approved response playbooks in under 50 milliseconds. Isolate, contain, eradicate — all before your SOC team reads the alert.',
    tags: ['SOAR Playbooks', 'Auto-Quarantine', 'Forensic Capture'],
    terminal: [
      '$ cipher respond --incident INC-4729',
      '> Executing playbook: LATERAL_MOVEMENT',
      '> Isolating host: 10.2.4.87...',
      '> Revoking credentials...',
      '> ✓ Contained in 43ms',
    ],
  },
  {
    id: 'harden',
    icon: CheckCircle,
    color: 'yellow',
    step: '04',
    title: 'Continuous Hardening',
    subtitle: 'Get stronger after every attack.',
    desc: 'Post-incident analysis drives automatic policy updates. Each attack makes your defenses smarter. CIPHER\'s attack surface management closes gaps before adversaries find them.',
    tags: ['Policy Automation', 'Patch Prioritization', 'Risk Scoring'],
    terminal: [
      '$ cipher harden --post-incident INC-4729',
      '> Generating remediation report...',
      '> 12 policy updates applied',
      '> Risk score: 94 → 12',
      '> ✓ Attack surface reduced 87%',
    ],
  },
]

const colorMap = {
  blue:    { text: '#60a5fa', bg: 'rgba(59,130,246,0.1)',   border: 'rgba(59,130,246,0.25)',  glow: '#3b82f6' },
  violet:  { text: '#a78bfa', bg: 'rgba(124,58,237,0.1)',   border: 'rgba(124,58,237,0.2)',   glow: '#7c3aed' },
  emerald: { text: '#34d399', bg: 'rgba(52,211,153,0.08)',  border: 'rgba(52,211,153,0.2)',   glow: '#10b981' },
  yellow:  { text: '#fbbf24', bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.2)',   glow: '#f59e0b' },
}

function TerminalPanel({ step, active }) {
  const c = colorMap[step.color]
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 12, scale: active ? 1 : 0.98 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="absolute inset-0 glass-strong rounded-2xl overflow-hidden pointer-events-none"
    >
      {/* Terminal bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs font-mono text-slate-500">cipher-cli — threat-response</span>
      </div>

      {/* Terminal lines */}
      <div className="p-5 font-mono text-sm space-y-1.5">
        {step.terminal.map((line, i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, x: -8 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.3, delay: active ? i * 0.12 : 0, ease: [0.23, 1, 0.32, 1] }}
            className={
              line.startsWith('$') ? 'text-slate-300' :
              line.startsWith('> ✓') ? '' :
              line.startsWith('> ALERT') ? 'text-red-400' :
              'text-slate-500'
            }
            style={line.startsWith('> ✓') ? { color: c.text } : {}}
          >
            {line}
            {i === step.terminal.length - 1 && active && (
              <span className="inline-block w-2 h-4 bg-current ml-0.5 align-text-bottom" style={{ animation: 'blink 1s ease infinite' }} />
            )}
          </motion.div>
        ))}
      </div>

      {/* Glow accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${c.bg}, transparent)` }}
      />
    </motion.div>
  )
}

export default function ScrollShowcase() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const activeIndex = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0, 1, 2, 3])

  const [currentStep, setCurrentStep] = useState(0)
  activeIndex.on('change', (v) => setCurrentStep(Math.min(Math.round(v), STEPS.length - 1)))

  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section id="security" className="relative" ref={containerRef} style={{ height: `${STEPS.length * 100}vh` }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none" />

        {/* Accent lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" aria-hidden />

        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-5">
              <AlertTriangle className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs font-mono text-violet-400 tracking-widest uppercase">How it works</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gradient-white">
              The full threat lifecycle.<br />Automated.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: steps */}
            <div className="flex flex-col gap-3">
              {STEPS.map((step, i) => {
                const c = colorMap[step.color]
                const active = currentStep === i
                return (
                  <div
                    key={step.id}
                    className={`relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                      active ? 'glass' : 'opacity-40'
                    }`}
                    style={{ borderColor: active ? c.border : 'transparent', borderWidth: 1 }}
                  >
                    {/* Step number */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-mono text-sm font-bold"
                      style={{ background: active ? c.bg : 'rgba(255,255,255,0.03)', color: active ? c.text : '#475569' }}
                    >
                      {step.step}
                    </div>

                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-white mb-0.5">{step.title}</div>
                      <div className="text-xs text-slate-500">{step.subtitle}</div>

                      <motion.div
                        animate={{ height: active ? 'auto' : 0, opacity: active ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-slate-400 leading-relaxed mt-2.5 mb-3">{step.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {step.tags.map(tag => (
                            <span
                              key={tag}
                              className="text-xs px-2.5 py-0.5 rounded-full font-mono"
                              style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {active && (
                      <div
                        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
                        style={{ background: `linear-gradient(to bottom, transparent, ${c.glow}, transparent)` }}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Right: terminal */}
            <div className="relative h-72 lg:h-96">
              {STEPS.map((step, i) => (
                <TerminalPanel key={step.id} step={step} active={currentStep === i} />
              ))}
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-10">
            {STEPS.map((_, i) => {
              const c = colorMap[STEPS[i].color]
              return (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: currentStep === i ? 24 : 8,
                    height: 8,
                    background: currentStep === i ? c.glow : 'rgba(255,255,255,0.1)',
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
