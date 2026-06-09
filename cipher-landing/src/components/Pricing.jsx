import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: { monthly: 199, annual: 159 },
    desc: 'For small teams getting started with security.',
    color: 'blue',
    features: [
      'Up to 50 endpoints',
      'AI threat detection',
      'Basic SIEM integration',
      '5GB log retention / day',
      'Email alerting',
      'Community support',
    ],
  },
  {
    name: 'Professional',
    price: { monthly: 799, annual: 639 },
    desc: 'For scaling companies with complex infrastructure.',
    color: 'violet',
    popular: true,
    features: [
      'Up to 500 endpoints',
      'Zero-trust access control',
      'SOAR playbook automation',
      '100GB log retention / day',
      'Slack + PagerDuty alerts',
      'Priority 24/7 support',
      'Compliance reporting (SOC 2)',
      'Custom threat models',
    ],
  },
  {
    name: 'Enterprise',
    price: null,
    desc: 'Custom deployment for large organizations.',
    color: 'emerald',
    features: [
      'Unlimited endpoints',
      'On-premise or hybrid deploy',
      'Dedicated threat intelligence',
      'Unlimited log retention',
      'Custom integrations',
      'Dedicated SOC analyst',
      'White-glove onboarding',
      'SLA guarantees + legal review',
    ],
  },
]

const colorMap = {
  blue:    { text: '#60a5fa', bg: 'rgba(59,130,246,0.08)',   border: 'rgba(59,130,246,0.2)',  btn: 'from-blue-600 to-blue-500' },
  violet:  { text: '#a78bfa', bg: 'rgba(124,58,237,0.1)',    border: 'rgba(124,58,237,0.3)',  btn: 'from-violet-600 to-blue-600' },
  emerald: { text: '#34d399', bg: 'rgba(52,211,153,0.06)',   border: 'rgba(52,211,153,0.2)',  btn: 'from-emerald-600 to-teal-600' },
}

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" aria-hidden />
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="text-gradient-white">Simple,</span>{' '}
            <span className="text-gradient">transparent pricing.</span>
          </h2>
          <p className="text-slate-400 mb-8">No hidden fees. No vendor lock-in. Cancel anytime.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 glass px-5 py-2 rounded-full">
            <span className={`text-sm transition-colors ${!annual ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 rounded-full transition-colors duration-200"
              style={{ background: annual ? '#7c3aed' : 'rgba(255,255,255,0.1)' }}
              aria-label="Toggle annual billing"
              data-hover
            >
              <div
                className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200"
                style={{ transform: annual ? 'translateX(26px)' : 'translateX(4px)' }}
              />
            </button>
            <span className={`text-sm transition-colors ${annual ? 'text-white' : 'text-slate-500'}`}>
              Annual
              <span className="ml-1.5 text-xs text-emerald-400 font-mono">−20%</span>
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, i) => {
            const c = colorMap[plan.color]
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className={`relative glass rounded-2xl p-7 flex flex-col ${
                  plan.popular ? 'ring-1 ring-violet-500/40 glow-purple scale-[1.02]' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-semibold">
                      <Zap className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-5">
                  <span className="text-sm font-mono" style={{ color: c.text }}>{plan.name}</span>
                  <div className="mt-3 flex items-end gap-1.5">
                    {plan.price ? (
                      <>
                        <span className="text-4xl font-bold text-white">${annual ? plan.price.annual : plan.price.monthly}</span>
                        <span className="text-slate-500 text-sm mb-1">/mo</span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-white">Custom</span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm mt-2">{plan.desc}</p>
                </div>

                <div className="flex flex-col gap-2.5 mb-7 flex-1">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: c.text }} strokeWidth={2.5} />
                      <span className="text-sm text-slate-300">{f}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#"
                  className={`btn-press block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    plan.popular
                      ? `bg-gradient-to-r ${c.btn} text-white shadow-lg shadow-violet-900/30 hover:shadow-violet-900/50`
                      : 'glass text-white hover:border-white/20'
                  }`}
                  data-hover
                >
                  {plan.price ? 'Get Started' : 'Contact Sales'}
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
