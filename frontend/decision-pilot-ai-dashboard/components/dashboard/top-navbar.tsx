'use client'

import { Bell, Search, Sparkles } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 border-b border-border glass-strong px-4 md:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-cyan to-purple shadow-[0_0_20px_oklch(0.62_0.19_255_/_0.5)]">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <span className="hidden text-sm font-semibold tracking-tight sm:block">
          DecisionPilot<span className="text-primary"> AI</span>
        </span>
      </div>

      <div className="hidden flex-col items-center md:flex">
        <span className="text-sm font-semibold tracking-tight">
          DecisionPilot AI
        </span>
        <span className="text-[11px] text-muted-foreground">
          Enterprise Decision Intelligence Platform
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="hidden text-muted-foreground sm:inline-flex"
          aria-label="Search"
        >
          <Search className="h-[18px] w-[18px]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
        </Button>
        <Avatar className="h-9 w-9 border border-border">
          <AvatarFallback className="bg-gradient-to-br from-primary to-purple text-xs font-semibold text-primary-foreground">
            AM
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
