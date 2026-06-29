'use client'

import { motion } from 'motion/react'
import { Sparkles, Zap } from 'lucide-react'

interface HeroSectionProps {
  onAnalyze: () => void
  analyzing: boolean
  analysis?: any
}

export function HeroSection({
  onAnalyze,
  analyzing,
  analysis,
}: HeroSectionProps) {

  const risk =
    analysis?.reasoning?.business_risk ?? ''

  const opportunity =
    analysis?.reasoning?.business_opportunity ?? ''

  const health =
    analysis?.health_score ?? 0

  let badge = 'Agentic Decision Intelligence'
  let headline = 'DecisionPilot AI'
  let subtitle =
    'Transform customer meetings into intelligent business decisions using collaborative AI agents.'

  if (analysis) {
    if (risk.toLowerCase().includes('critical')) {
      badge = '🚨 Critical Risk'
      headline = 'Executive Escalation Required'
      subtitle = opportunity
    } else if (risk.toLowerCase().includes('high')) {
      badge = '⚠ High Churn Risk'
      headline = 'Customer Needs Immediate Attention'
      subtitle = opportunity
    } else if (risk.toLowerCase().includes('low')) {
      badge = '🟢 Healthy Customer'
      headline = 'Expansion Opportunity Identified'
      subtitle = opportunity
    } else if (health >= 80) {
      badge = '📈 Growth Opportunity'
      headline = 'Healthy Customer Relationship'
      subtitle = opportunity
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border glass grid-texture px-6 py-10 md:px-10 md:py-14">

      <div className="relative z-10 mx-auto max-w-2xl text-center">

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
        >
          <Zap className="h-3.5 w-3.5" />
          {badge}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-6xl"
        >
          <span className="text-gradient">
            {headline}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mt-7 flex justify-center"
        >
          <button
            onClick={onAnalyze}
            disabled={analyzing}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary to-purple px-8 py-4 text-base font-semibold text-primary-foreground shadow-[0_10px_40px_oklch(0.62_0.19_255_/_0.45)] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Sparkles
              className={
                analyzing
                  ? 'h-5 w-5 animate-spin'
                  : 'h-5 w-5'
              }
            />

            {analyzing
              ? 'Agents Analyzing...'
              : 'Analyze Meeting'}

            <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
          </button>
        </motion.div>

      </div>

    </section>
  )
}