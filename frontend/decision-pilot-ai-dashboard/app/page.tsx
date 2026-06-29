'use client'

import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  agents,
  liveActivity,
  type ActivityLog,
  type AgentId,
} from '@/lib/dashboard-data'
import { analyzeMeeting } from "@/lib/api"
import { TopNavbar } from '@/components/dashboard/top-navbar'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { HeroSection } from '@/components/dashboard/hero-section'
import { AiBrain } from '@/components/dashboard/ai-brain'
import { LiveActivity } from '@/components/dashboard/live-activity'
import { AgentPipeline } from '@/components/dashboard/agent-pipeline'
import { UploadCard } from '@/components/dashboard/upload-card'
import { MetricCards } from '@/components/dashboard/metric-cards'
import { Recommendations } from '@/components/dashboard/recommendations'
import { EvidencePanel } from '@/components/dashboard/evidence-panel'
import { ConfidenceScore } from '@/components/dashboard/confidence-score'
import { AnalyticsCharts } from '@/components/dashboard/analytics-charts'

import { SiteFooter } from '@/components/dashboard/site-footer'
import { ExplanationCard } from '@/components/dashboard/explanation-card'

type Phase = 'idle' | 'analyzing' | 'complete'

const STEP_MS = 1400

export default function Page() {
  const [phase, setPhase] = useState<Phase>('idle')
  console.log("PAGE LOADED")
  const [activeAgents, setActiveAgents] = useState<AgentId[]>([])
  const [completedAgents, setCompletedAgents] = useState<AgentId[]>([])
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [progress, setProgress] = useState(0)
  const [transcript, setTranscript] = useState("")
  const [analysis, setAnalysis] = useState<any>(null)
  const [meetingFile, setMeetingFile] = useState<File | null>(null)
  console.log("PAGE STATE meetingFile =", meetingFile)
  const [crmFile, setCrmFile] = useState<File | null>(null)
  const [emailFile, setEmailFile] = useState<File | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const runAnalysis = async () => {
  if (phase === 'analyzing') return

  timers.current.forEach(clearTimeout)
  timers.current = []

  setPhase('analyzing')
  setActiveAgents([])
  setCompletedAgents([])
  setLogs([])
  setProgress(0)

  console.log("Transcript =", transcript)

  try {
    console.log("Calling backend...")
    console.log("Meeting File:", meetingFile)
console.log("CRM File:", crmFile)
console.log("Email File:", emailFile)


console.log("Current meetingFile:", meetingFile)

if (!meetingFile && !crmFile && !emailFile) {
    alert("Please upload at least one document.")
    return
}
console.log("Sending request...");
console.log("Meeting:", meetingFile);
console.log("CRM:", crmFile);
console.log("Email:", emailFile);

const result = await analyzeMeeting(
  meetingFile,
  crmFile,
  emailFile
)

console.log("Backend returned:", result)

    setAnalysis(result)

    const aiLogs = [
      {
        id: "1",
        agent: "Context Agent",
        message: `Health Score: ${result.health_score} | Sentiment: ${result.sentiment}`,
        color: "#22c55e",
      },
      {
        id: "2",
        agent: "Knowledge Agent",
        message: `Risk Level: ${result.knowledge.risk}`,
        color: "#3b82f6",
      },
      {
        id: "3",
        agent: "Reasoning Agent",
        message: result.reasoning.business_risk,
        color: "#f59e0b",
      },
      {
        id: "4",
        agent: "Recommendation Agent",
        message: `${result.recommendations.length} recommendations generated`,
        color: "#a855f7",
      },
    ]

    aiLogs.forEach((log, i) => {
      timers.current.push(
        setTimeout(() => {
          setLogs((prev) => [...prev, log])
        }, i * 1200)
      )
    })

    agents.forEach((agent, i) => {
      const start = i * STEP_MS

      timers.current.push(
        setTimeout(() => {
          setActiveAgents((prev) => [...prev, agent.id])
          setProgress(((i + 0.4) / agents.length) * 100)
        }, start)
      )

      timers.current.push(
        setTimeout(() => {
          setActiveAgents((prev) =>
            prev.filter((a) => a !== agent.id)
          )

          setCompletedAgents((prev) => [
            ...prev,
            agent.id,
          ])

          setProgress(((i + 1) / agents.length) * 100)
        }, start + STEP_MS - 100)
      )
    })

    timers.current.push(
      setTimeout(() => {
        setProgress(100)
        setPhase("complete")
      }, agents.length * STEP_MS + 200)
    )
  } catch (err) {
    console.error(err)
    alert("Backend connection failed!")
  }
}

  const analyzing = phase === 'analyzing'
  const showResults = phase === 'complete'

  return (
    <div className="min-h-screen">
      <TopNavbar />
      <div className="mx-auto flex w-full max-w-[1500px]">
        <AppSidebar />

        <main className="min-w-0 flex-1 px-4 py-6 md:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <HeroSection
  onAnalyze={runAnalysis}
  analyzing={analyzing}
/>

            {/* Progress bar */}
            <AnimatePresence>
              {analyzing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary via-cyan to-purple"
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: 'easeOut' }}
                      />
                    </div>
                    <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                      {Math.round(progress)}%
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Centerpiece + live activity */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-border glass grid-texture p-4 lg:col-span-2">
                <div className="mb-2 flex items-center justify-between px-2">
                  <h3 className="text-sm font-semibold">
                    Collaborative Agent Core
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {phase === 'complete'
                      ? 'Decision synthesized'
                      : phase === 'analyzing'
                        ? 'Agents reasoning…'
                        : 'Standing by'}
                  </span>
                </div>
                <AiBrain
                  phase={phase}
                  activeAgents={activeAgents}
                  completedAgents={completedAgents}
                />
              </div>
              <LiveActivity logs={logs} running={analyzing} />
            </div>

            <AgentPipeline
              phase={phase}
              activeAgents={activeAgents}
              completedAgents={completedAgents}
            />

            {!showResults && (
              <UploadCard
  transcript={transcript}
  setTranscript={setTranscript}

  meetingFile={meetingFile}
  setMeetingFile={setMeetingFile}

  crmFile={crmFile}
  setCrmFile={setCrmFile}

  emailFile={emailFile}
  setEmailFile={setEmailFile}

  onAnalyze={runAnalysis}
  disabled={phase === 'analyzing'}
/>
            )}

            {/* Results */}
            <AnimatePresence>
  {showResults && (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6"
    >
      <MetricCards analysis={analysis} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Recommendations
            recommendations={analysis?.recommendations}
          />
        </div>

        <ConfidenceScore analysis={analysis} />
      </div>

      <EvidencePanel
  context={analysis?.context}
  previousMeeting={analysis?.previous_meeting}
  knowledge={analysis?.knowledge}
  explanation={analysis?.explanation}
/>
        <ExplanationCard
  explanation={analysis?.explanation}
/>


      <div>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          Analytics
        </h2>

        <AnalyticsCharts analysis={analysis} />
      </div>
    </motion.div>
  )}
</AnimatePresence>

            <SiteFooter />
          </div>
        </main>
      </div>
    </div>
  )
}
