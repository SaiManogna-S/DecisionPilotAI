'use client'

import { motion } from 'motion/react'
import { Brain } from 'lucide-react'
import { agents, type AgentId } from '@/lib/dashboard-data'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'analyzing' | 'complete'

interface AiBrainProps {
  phase: Phase
  activeAgents: AgentId[]
  completedAgents: AgentId[]
}

// Four positions around the brain (top, right, bottom, left)
const positions = [
  { x: 0, y: -150 },
  { x: 150, y: 0 },
  { x: 0, y: 150 },
  { x: -150, y: 0 },
]

export function AiBrain({ phase, activeAgents, completedAgents }: AiBrainProps) {
  const isActive = phase === 'analyzing'
  const isComplete = phase === 'complete'
  const glowing = isActive || isComplete

  return (
    <div className="relative mx-auto flex h-[420px] w-full max-w-[460px] items-center justify-center">
      {/* Connection lines (SVG) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="-230 -230 460 460"
        aria-hidden="true"
      >
        {agents.map((agent, i) => {
          const p = positions[i]
          const lit =
            activeAgents.includes(agent.id) ||
            completedAgents.includes(agent.id)
          return (
            <line
              key={agent.id}
              x1={0}
              y1={0}
              x2={p.x * 0.78}
              y2={p.y * 0.78}
              stroke={lit ? agent.color : 'oklch(0.7 0.05 260 / 0.18)'}
              strokeWidth={lit ? 2 : 1}
              strokeDasharray="6 6"
              style={{
                animation: lit ? 'dash-flow 0.7s linear infinite' : undefined,
                filter: lit
                  ? `drop-shadow(0 0 6px ${agent.color})`
                  : undefined,
                transition: 'stroke 0.5s ease',
              }}
            />
          )
        })}
      </svg>

      {/* Rotating particle rings */}
      <div
        className="absolute h-[300px] w-[300px] rounded-full border border-primary/20"
        style={{ animation: glowing ? 'ring-spin 14s linear infinite' : 'none' }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-primary/70"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 30}deg) translateX(150px)`,
              opacity: glowing ? 1 : 0.3,
              boxShadow: glowing ? '0 0 8px var(--primary)' : 'none',
            }}
          />
        ))}
      </div>
      <div
        className="absolute h-[230px] w-[230px] rounded-full border border-cyan/20"
        style={{
          animation: glowing ? 'ring-spin-rev 10s linear infinite' : 'none',
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan/70"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 45}deg) translateX(115px)`,
              opacity: glowing ? 1 : 0.3,
              boxShadow: glowing ? '0 0 6px var(--cyan)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Light rays */}
      {glowing && (
        <div
          className="absolute h-[340px] w-[340px] rounded-full opacity-60"
          style={{
            background:
              'conic-gradient(from 0deg, transparent, var(--primary), transparent 25%, transparent 50%, var(--purple), transparent 75%)',
            maskImage:
              'radial-gradient(circle, transparent 38%, black 40%, transparent 60%)',
            WebkitMaskImage:
              'radial-gradient(circle, transparent 38%, black 40%, transparent 60%)',
            animation: 'ring-spin 8s linear infinite',
          }}
        />
      )}

      {/* Central brain core */}
      <motion.div
        className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full"
        animate={
          isActive
            ? { scale: [1, 1.07, 1] }
            : { scale: 1 }
        }
        transition={{
          duration: 1.4,
          repeat: isActive ? Number.POSITIVE_INFINITY : 0,
          ease: 'easeInOut',
        }}
        style={{
          background:
            'radial-gradient(circle at 35% 30%, oklch(0.75 0.16 250), oklch(0.45 0.2 270))',
          boxShadow: glowing
            ? '0 0 60px 6px oklch(0.62 0.19 255 / 0.6), 0 0 120px 20px oklch(0.62 0.21 295 / 0.35), inset 0 0 30px oklch(0.85 0.1 230 / 0.5)'
            : '0 0 24px oklch(0.62 0.19 255 / 0.25)',
        }}
      >
        <div className="absolute inset-1 rounded-full border border-white/20" />
        <Brain
          className="h-14 w-14 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          strokeWidth={1.5}
        />
      </motion.div>

      {/* Agent nodes */}
      {agents.map((agent, i) => {
        const p = positions[i]
        const Icon = agent.icon
        const active = activeAgents.includes(agent.id)
        const done = completedAgents.includes(agent.id)
        return (
          <motion.div
            key={agent.id}
            className="absolute z-20"
            style={{ left: '50%', top: '50%' }}
            initial={false}
            animate={{
              x: p.x - 36,
              y: p.y - 36,
              scale: active ? 1.12 : 1,
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          >
            <motion.div
              className={cn(
                'flex h-[72px] w-[72px] flex-col items-center justify-center gap-1 rounded-2xl border text-center backdrop-blur-md transition-colors',
                done
                  ? 'border-success/60 bg-success/15'
                  : active
                    ? 'border-primary/60 bg-card/90'
                    : 'border-border bg-card/60',
              )}
              animate={
                active
                  ? { boxShadow: [
                      `0 0 0px ${agent.color}`,
                      `0 0 22px ${agent.color}`,
                      `0 0 0px ${agent.color}`,
                    ] }
                  : { boxShadow: '0 0 0px transparent' }
              }
              transition={{
                duration: 1.2,
                repeat: active ? Number.POSITIVE_INFINITY : 0,
              }}
            >
              <Icon
                className="h-5 w-5"
                style={{
                  color: done || active ? agent.color : 'var(--muted-foreground)',
                }}
              />
              <span className="px-1 text-[9px] font-medium leading-tight text-foreground/80">
                {agent.shortName}
              </span>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
