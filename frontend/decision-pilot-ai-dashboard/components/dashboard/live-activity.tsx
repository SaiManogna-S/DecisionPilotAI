'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Activity } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { type ActivityLog } from '@/lib/dashboard-data'

interface LiveActivityProps {
  logs: ActivityLog[]
  running: boolean
}

export function LiveActivity({ logs, running }: LiveActivityProps) {
  return (
    <Card className="flex h-full flex-col border-border glass p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Live AI Activity</h3>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span
            className={`h-2 w-2 rounded-full ${
              running ? 'animate-pulse bg-success' : 'bg-muted-foreground/40'
            }`}
          />
          {running ? 'Streaming' : 'Idle'}
        </span>
      </div>

      <div className="flex-1 space-y-2 overflow-hidden">
        {logs.length === 0 && (
          <p className="py-8 text-center text-xs text-muted-foreground">
            Run an analysis to stream agent activity in real time.
          </p>
        )}
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              layout
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-2.5 rounded-lg border border-border bg-card/50 px-3 py-2"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: log.color, boxShadow: `0 0 6px ${log.color}` }}
              />
              <div className="min-w-0">
                <p
                  className="text-[11px] font-semibold"
                  style={{ color: log.color }}
                >
                  {log.agent}
                </p>
                <p className="text-xs text-foreground/80">{log.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  )
}
