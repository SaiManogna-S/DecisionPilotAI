'use client'

import { motion } from 'motion/react'
import { Check, ChevronRight, FileUp, ShieldCheck } from 'lucide-react'
import { agents, type AgentId } from '@/lib/dashboard-data'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'analyzing' | 'complete'

interface AgentPipelineProps {
  phase: Phase
  activeAgents: AgentId[]
  completedAgents: AgentId[]
}

export function AgentPipeline({
  phase,
  activeAgents,
  completedAgents,
}: AgentPipelineProps) {
  const started = phase !== 'idle'

  const steps = [
    { key: 'upload', name: 'Meeting Uploaded', icon: FileUp, done: started },
    ...agents.map((a) => ({
      key: a.id,
      name: a.name,
      icon: a.icon,
      done: completedAgents.includes(a.id),
      active: activeAgents.includes(a.id),
      color: a.color,
    })),
    {
      key: 'ready',
      name: 'Decision Ready',
      icon: ShieldCheck,
      done: phase === 'complete',
    },
  ]

  return (
    <Card className="border-border glass p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold">AI Agent Workflow</h3>
        <span className="text-xs text-muted-foreground">
          {phase === 'complete'
            ? 'Pipeline complete'
            : phase === 'analyzing'
              ? 'Agents collaborating…'
              : 'Awaiting transcript'}
        </span>
      </div>

      <div className="flex items-stretch gap-2 overflow-x-auto pb-2">
        {steps.map((step, i) => {
          const Icon = step.icon
          const active = 'active' in step && step.active
          const done = step.done
          const color = 'color' in step ? step.color : 'var(--primary)'
          return (
            <div key={step.key} className="flex min-w-fit items-center gap-2">
              <motion.div
                initial={false}
                animate={{
                  scale: active ? 1.04 : 1,
                  borderColor: done
                    ? 'oklch(0.72 0.18 155 / 0.6)'
                    : active
                      ? color
                      : 'oklch(0.7 0.05 260 / 0.14)',
                }}
                className={cn(
                  'flex w-[120px] flex-col items-center gap-2 rounded-xl border bg-card/70 px-3 py-3 text-center',
                  active && 'shadow-[0_0_20px_oklch(0.62_0.19_255_/_0.35)]',
                )}
              >
                <span
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                    done
                      ? 'bg-success/20'
                      : active
                        ? 'bg-primary/15'
                        : 'bg-secondary',
                  )}
                  style={
                    active ? { boxShadow: `0 0 14px ${color}` } : undefined
                  }
                >
                  {done ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Icon
                      className="h-4 w-4"
                      style={{
                        color: active ? color : 'var(--muted-foreground)',
                      }}
                    />
                  )}
                </span>
                <span className="text-[11px] font-medium leading-tight text-foreground/90">
                  {step.name}
                </span>
                {active && (
                  <motion.span
                    className="h-1 w-10 overflow-hidden rounded-full bg-secondary"
                    aria-hidden
                  >
                    <motion.span
                      className="block h-full rounded-full bg-primary"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  </motion.span>
                )}
              </motion.div>
              {i < steps.length - 1 && (
                <ChevronRight
                  className={cn(
                    'h-4 w-4 shrink-0',
                    done ? 'text-success' : 'text-muted-foreground/40',
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
