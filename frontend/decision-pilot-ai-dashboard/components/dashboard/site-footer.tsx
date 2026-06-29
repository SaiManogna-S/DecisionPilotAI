export function SiteFooter() {
  const tech = ['LangGraph', 'Gemini', 'FAISS', 'FastAPI', 'Next.js']
  return (
    <footer className="mt-2 border-t border-border px-2 py-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-xs text-muted-foreground">Powered by</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-foreground/80"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">
          DecisionPilot AI — Enterprise Decision Intelligence Platform
        </p>
      </div>
    </footer>
  )
}
