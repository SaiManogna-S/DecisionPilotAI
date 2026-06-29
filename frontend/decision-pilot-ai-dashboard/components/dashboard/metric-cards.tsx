'use client'

import { motion } from 'motion/react'
import {
  CalendarClock,
  HeartPulse,
  TriangleAlert,
  Smile,
  Meh,
  Frown,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react'
import { Card } from '@/components/ui/card'

interface Props {
  analysis?: any
}

function RadialGauge({
  value,
  color,
}: {
  value: number
  color: string
}) {
  const r = 34
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c

  return (
    <div className="relative h-24 w-24">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="var(--secondary)"
          strokeWidth="7"
        />

        <motion.circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2 }}
          style={{
            filter: `drop-shadow(0 0 5px ${color})`,
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">
          {value}
        </span>

        <span className="text-[10px] text-muted-foreground">
          /100
        </span>
      </div>
    </div>
  )
}

function Countdown({
  days,
}: {
  days: number
}) {
  return (
    <div className="flex items-end gap-1">
      <span className="text-4xl font-bold text-warning">
        {days}
      </span>

      <span className="pb-1 text-sm text-muted-foreground">
        days
      </span>
    </div>
  )
}

export function MetricCards({
  analysis,
}: Props) {

  const health =
    analysis?.health_score ?? 35

  const sentiment =
    analysis?.sentiment ?? 'Negative'

  const renewal =
    analysis?.renewal_days ?? 15

  const risk =
    analysis?.reasoning?.business_risk ?? 'Unknown'
  const trend =
  analysis?.reasoning?.trend ?? "Stable"

const SentimentIcon =
  sentiment.toLowerCase().includes("positive")
    ? Smile
    : sentiment.toLowerCase().includes("neutral")
    ? Meh
    : Frown

const sentimentColor =
  sentiment.toLowerCase().includes("positive")
    ? "var(--success)"
    : sentiment.toLowerCase().includes("neutral")
    ? "var(--warning)"
    : "var(--destructive)"

const riskColor =
  risk.toLowerCase() === "high"
    ? "var(--destructive)"
    : risk.toLowerCase() === "medium"
    ? "var(--warning)"
    : "var(--success)"

const TrendIcon =
  trend.toLowerCase() === "improving"
    ? TrendingUp
    : trend.toLowerCase() === "declining"
    ? TrendingDown
    : Minus

const trendColor =
  trend.toLowerCase() === "improving"
    ? "var(--success)"
    : trend.toLowerCase() === "declining"
    ? "var(--destructive)"
    : "var(--warning)"

  const healthStatus =
    health >= 90
      ? 'Excellent'
      : health >= 75
      ? 'Healthy'
      : health >= 50
      ? 'Stable'
      : health >= 30
      ? 'Warning'
      : 'Critical'

  const healthColor =
    health >= 75
      ? 'var(--success)'
      : health >= 50
      ? 'var(--cyan)'
      : health >= 30
      ? 'var(--warning)'
      : 'var(--destructive)'

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Card className="border-border glass p-5">

          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Customer Health
            </span>

            <HeartPulse
              className="h-4 w-4"
              style={{
                color: healthColor,
              }}
            />
          </div>

          <div className="flex min-h-24 items-center">
            <RadialGauge
              value={health}
              color={healthColor}
            />
          </div>

          <div className="mt-3 space-y-1">

            <p
              className="text-xs font-semibold"
              style={{
                color: healthColor,
              }}
            >
              {healthStatus}
            </p>
<div
  className="mt-2 flex items-center gap-2 text-xs font-semibold"
  style={{ color: trendColor }}
>
  <TrendIcon className="h-4 w-4" />
  {trend}
</div>
            <p
              className={`text-xs font-semibold ${
                trend === 'improving'
                  ? 'text-green-400'
                  : trend === 'declining'
                  ? 'text-red-400'
                  : 'text-yellow-400'
              }`}
            >
              {trend === 'improving'
                ? '🟢 Improving'
                : trend === 'declining'
                ? '🔴 Declining'
                : '🟡 Stable'}
            </p>

          </div>

        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Card className="border-border glass p-5">

          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Business Risk
            </span>

            <TriangleAlert className="h-4 w-4 text-warning" />
          </div>

          <div className="flex min-h-24 items-center">
            <div
  className="rounded-xl px-4 py-3 font-semibold"
  style={{
    backgroundColor: `${riskColor}20`,
    color: riskColor,
  }}
>
  {risk}
</div>
 
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            AI Assessment
          </p>

        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Card className="border-border glass p-5">

          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Sentiment
            </span>

            <SentimentIcon
  className="h-4 w-4"
  style={{ color: sentimentColor }}
/>
          </div>

          <div className="flex min-h-24 items-center gap-3">

            <SentimentIcon
  className="h-9 w-9"
  style={{ color: sentimentColor }}
/>
            <span
  className="text-2xl font-bold"
  style={{ color: sentimentColor }}
>
              {sentiment}
            </span>

          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Meeting Sentiment
          </p>

        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Card className="border-border glass p-5">

          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Renewal
            </span>

            <CalendarClock className="h-4 w-4 text-cyan" />
          </div>

          <div className="flex min-h-24 items-center">
            <Countdown days={renewal} />
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Contract Expiry
          </p>

        </Card>
      </motion.div>

    </div>
  )
}