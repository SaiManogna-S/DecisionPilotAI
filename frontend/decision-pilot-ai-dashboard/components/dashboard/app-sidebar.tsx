'use client'

import { useState } from 'react'
import {
  BarChart3,
  Bot,
  FileText,
  LayoutDashboard,
  Settings,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  id: string
  label: string
  icon: LucideIcon
}

const items: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'workflow', label: 'AI Workflow', icon: Bot },
  { id: 'knowledge', label: 'Knowledge Base', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function AppSidebar() {
  const [active, setActive] = useState('dashboard')

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-16 shrink-0 flex-col items-center gap-1 border-r border-border bg-sidebar py-5 lg:flex xl:w-56 xl:items-stretch xl:px-3">
      <nav className="flex w-full flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={cn(
                'group relative flex items-center justify-center gap-3 rounded-xl px-0 py-2.5 text-sm font-medium transition-colors xl:justify-start xl:px-3',
                isActive
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <span className="absolute left-0 h-6 w-1 rounded-r-full bg-primary shadow-[0_0_10px_var(--primary)]" />
              )}
              <Icon className="h-5 w-5 shrink-0" />
              <span className="hidden xl:inline">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto hidden w-full rounded-xl border border-border bg-card/60 p-3 xl:block">
        <p className="text-xs font-medium text-foreground">Enterprise Plan</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Unlimited agent runs
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary to-cyan" />
        </div>
      </div>
    </aside>
  )
}
