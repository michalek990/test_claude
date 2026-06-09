import { Shield, ArrowRight, ExternalLink } from 'lucide-react'

// Inline SVGs for social icons (lucide doesn't export Github/Twitter/Linkedin)
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const links = {
  Product: ['Platform', 'Security', 'Integrations', 'Changelog', 'Status'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Resources: ['Docs', 'API Reference', 'Security Hub', 'Community', 'Partners'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'DPA'],
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-20 pb-10">
      {/* CTA band */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="relative glass rounded-2xl px-8 py-12 text-center overflow-hidden glow-blue">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-violet-600/5 to-transparent pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gradient-white mb-4">
              Start protecting your infrastructure today.
            </h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Free 14-day trial. No credit card required. Up and running in under 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#"
                className="btn-press inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-xl shadow-blue-900/40 hover:from-blue-500 hover:to-violet-500 transition-all duration-200"
                data-hover
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="btn-press inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl glass text-slate-200 font-semibold hover:border-blue-500/30 transition-all duration-200"
                data-hover
              >
                Talk to Sales
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                CIPHER<span className="text-blue-400">_</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
              AI-powered security platform protecting the world's most critical infrastructure.
            </p>
            <div className="flex gap-3">
              {[
                { icon: GithubIcon, href: '#', label: 'GitHub' },
                { icon: TwitterIcon, href: '#', label: 'X / Twitter' },
                { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-white transition-colors"
                  data-hover
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">{group}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs font-mono">
            © 2025 CIPHER Security, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'blink 2s ease infinite' }} />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
