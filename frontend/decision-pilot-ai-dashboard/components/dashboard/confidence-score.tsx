'use client'

import { motion } from 'motion/react'
import { ShieldCheck, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface Props {
  analysis?: any
}

export function ConfidenceScore({ analysis }: Props) {

  const confidence =
    analysis?.reasoning?.confidence ?? 0

  const radius = 88
  const circumference = 2 * Math.PI * radius

  const offset =
    circumference -
    (confidence / 100) * circumference

  return (
    <Card className="border-border glass p-5">

      <div className="mb-5 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-emerald-400" />

        <h3 className="text-sm font-semibold">
          Enterprise Confidence Score
        </h3>
      </div>

      <div className="flex justify-center">

        <div className="relative h-56 w-56">

          <svg
            className="h-full w-full -rotate-90"
            viewBox="0 0 220 220"
          >

            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke="var(--secondary)"
              strokeWidth="14"
              fill="none"
            />

            <motion.circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke="var(--cyan)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{
                strokeDashoffset: circumference,
              }}
              animate={{
                strokeDashoffset: offset,
              }}
              transition={{
                duration: 1.4,
              }}
              style={{
                filter:
                  'drop-shadow(0 0 10px var(--cyan))',
              }}
            />

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span className="text-6xl font-bold text-cyan">
              {confidence}%
            </span>

            <span className="text-muted-foreground">
              AI Confidence
            </span>

          </div>

        </div>

      </div>

      <div className="mt-6 space-y-3 rounded-xl border border-border p-4">

        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span className="text-sm">
            Context analyzed successfully
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span className="text-sm">
            Enterprise knowledge matched
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span className="text-sm">
            Multi-agent reasoning completed
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span className="text-sm">
            Recommendations verified
          </span>
        </div>

      </div>

      <div className="mt-6 space-y-3 rounded-xl border border-border p-4">

  <div className="flex items-center gap-2">
    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
    <span className="text-sm">
      {analysis?.context
        ? "Context analyzed successfully"
        : "Context unavailable"}
    </span>
  </div>

  <div className="flex items-center gap-2">
    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
    <span className="text-sm">
      {analysis?.knowledge
        ? "Enterprise knowledge matched"
        : "Knowledge unavailable"}
    </span>
  </div>

  <div className="flex items-center gap-2">
    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
    <span className="text-sm">
      {analysis?.reasoning
        ? "Business reasoning completed"
        : "Reasoning unavailable"}
    </span>
  </div>

  <div className="flex items-center gap-2">
    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
    <span className="text-sm">
      {analysis?.recommendations?.length
        ? "Recommendations generated"
        : "No recommendations"}
    </span>
  </div>

</div>

    </Card>
  )
}