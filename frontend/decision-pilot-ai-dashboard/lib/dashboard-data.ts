import {
  Brain,
  Database,
  GitBranch,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react'

export type AgentId =
  | 'context'
  | 'knowledge'
  | 'reasoning'
  | 'recommendation'

export interface Agent {
  id: AgentId
  name: string
  shortName: string
  description: string
  icon: LucideIcon
  color: string
}

export const agents: Agent[] = [
  {
    id: 'context',
    name: 'Context Agent',
    shortName: 'Context',
    description: 'Parses transcript & extracts entities',
    icon: Brain,
    color: 'var(--primary)',
  },
  {
    id: 'knowledge',
    name: 'Knowledge Agent',
    shortName: 'Knowledge',
    description: 'Retrieves policy & account history',
    icon: Database,
    color: 'var(--cyan)',
  },
  {
    id: 'reasoning',
    name: 'Reasoning Agent',
    shortName: 'Reasoning',
    description: 'Evaluates risk & strategic options',
    icon: GitBranch,
    color: 'var(--purple)',
  },
  {
    id: 'recommendation',
    name: 'Recommendation Agent',
    shortName: 'Recommendation',
    description: 'Generates next best actions',
    icon: Lightbulb,
    color: 'var(--success)',
  },
]

export interface Recommendation {
  id: string
  priority: 'Critical' | 'High' | 'Medium'
  title: string
  impact: string
  confidence: number
  icon: LucideIcon
}

export interface Evidence {
  id: string
  document: string
  snippet: string
  confidence: number
}

export interface ActivityLog {
  id: string
  agent: string
  message: string
  color: string
}

export const liveActivity: ActivityLog[] = [
  { id: 'a1', agent: 'Context Agent', message: 'Parsing transcript segments…', color: 'var(--primary)' },
  { id: 'a2', agent: 'Context Agent', message: 'Extracted 14 entities & 3 stakeholders', color: 'var(--primary)' },
  { id: 'a3', agent: 'Knowledge Agent', message: 'Searching FAISS vector index…', color: 'var(--cyan)' },
  { id: 'a4', agent: 'Knowledge Agent', message: 'Matched 6 policy documents', color: 'var(--cyan)' },
  { id: 'a5', agent: 'Reasoning Agent', message: 'Scoring churn probability…', color: 'var(--purple)' },
  { id: 'a6', agent: 'Reasoning Agent', message: 'Risk vector resolved: HIGH', color: 'var(--purple)' },
  { id: 'a7', agent: 'Recommendation Agent', message: 'Ranking next best actions…', color: 'var(--success)' },
  { id: 'a8', agent: 'Recommendation Agent', message: '4 recommendations generated', color: 'var(--success)' },
]

// Charts
export const riskDistribution = [
  { name: 'Critical', value: 28, fill: 'var(--destructive)' },
  { name: 'High', value: 34, fill: 'var(--warning)' },
  { name: 'Medium', value: 22, fill: 'var(--cyan)' },
  { name: 'Low', value: 16, fill: 'var(--success)' },
]

export const healthTrend = [
  { month: 'Jan', health: 82 },
  { month: 'Feb', health: 78 },
  { month: 'Mar', health: 71 },
  { month: 'Apr', health: 64 },
  { month: 'May', health: 52 },
  { month: 'Jun', health: 41 },
  { month: 'Jul', health: 35 },
]

export const confidenceTrend = [
  { stage: 'Context', value: 88 },
  { stage: 'Knowledge', value: 91 },
  { stage: 'Reasoning', value: 94 },
  { stage: 'Recommend', value: 96 },
]

export const agentPerformance = [
  { metric: 'Speed', value: 92 },
  { metric: 'Accuracy', value: 96 },
  { metric: 'Recall', value: 88 },
  { metric: 'Coverage', value: 90 },
  { metric: 'Relevance', value: 94 },
]
