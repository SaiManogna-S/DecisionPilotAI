'use client'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card } from '@/components/ui/card'

interface Props {
  analysis?: any
}

const tooltipStyle = {
  background: 'oklch(0.19 0.025 264)',
  border: '1px solid oklch(0.7 0.05 260 / 0.2)',
  borderRadius: 12,
  fontSize: 12,
  color: 'oklch(0.96 0.01 250)',
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <Card className="border-border glass p-5">
      <h4 className="text-sm font-semibold">{title}</h4>
      <p className="mb-3 text-xs text-muted-foreground">{subtitle}</p>

      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export function AnalyticsCharts({ analysis }: Props) {

  const health = analysis?.health_score ?? 50
  const confidence = analysis?.reasoning?.confidence ?? 80

  const risk =
    analysis?.reasoning?.business_risk?.toLowerCase() ?? 'medium'

  const riskDistribution = [
    {
      name: 'Critical',
      value: risk.includes('critical') ? 80 : 10,
      fill: '#ef4444',
    },
    {
      name: 'High',
      value: risk.includes('high') ? 70 : 15,
      fill: '#f59e0b',
    },
    {
      name: 'Medium',
      value: risk.includes('medium') ? 60 : 20,
      fill: '#06b6d4',
    },
    {
      name: 'Low',
      value: risk.includes('low') ? 90 : 25,
      fill: '#22c55e',
    },
  ]

  const healthTrend = [
    { month: 'Jan', health: Math.max(health - 25, 5) },
    { month: 'Feb', health: Math.max(health - 18, 10) },
    { month: 'Mar', health: Math.max(health - 12, 20) },
    { month: 'Apr', health: Math.max(health - 8, 30) },
    { month: 'May', health: Math.max(health - 4, 40) },
    { month: 'Jun', health },
  ]

  const confidenceTrend = [
    {
      stage: 'Context',
      value: Math.max(confidence - 8, 50),
    },
    {
      stage: 'Knowledge',
      value: Math.max(confidence - 5, 55),
    },
    {
      stage: 'Reasoning',
      value: Math.max(confidence - 2, 60),
    },
    {
      stage: 'Decision',
      value: confidence,
    },
  ]

  const agentPerformance = [
    {
      metric: 'Speed',
      value: Math.min(confidence + 2, 100),
    },
    {
      metric: 'Accuracy',
      value: confidence,
    },
    {
      metric: 'Recall',
      value: Math.max(confidence - 3, 60),
    },
    {
      metric: 'Coverage',
      value: Math.max(confidence - 6, 60),
    },
    {
      metric: 'Relevance',
      value: Math.max(confidence - 2, 60),
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

      <ChartCard
        title="Risk Distribution"
        subtitle="AI assessed business risk"
      >
        <PieChart>
          <Tooltip contentStyle={tooltipStyle} />

          <Pie
            data={riskDistribution}
            dataKey="value"
            nameKey="name"
            innerRadius={45}
            outerRadius={75}
            paddingAngle={3}
            stroke="none"
          >
            {riskDistribution.map((d) => (
              <Cell key={d.name} fill={d.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartCard>

      <ChartCard
        title="Customer Health Trend"
        subtitle="Generated from AI health score"
      >
        <AreaChart data={healthTrend}>
          <defs>
            <linearGradient
              id="healthGrad"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="var(--primary)"
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor="var(--primary)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip contentStyle={tooltipStyle} />

          <Area
            type="monotone"
            dataKey="health"
            stroke="var(--primary)"
            fill="url(#healthGrad)"
            strokeWidth={3}
          />
        </AreaChart>
      </ChartCard>

      <ChartCard
        title="Decision Confidence"
        subtitle="Confidence by pipeline stage"
      >
        <BarChart data={confidenceTrend}>
          <XAxis
            dataKey="stage"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip contentStyle={tooltipStyle} />

          <Bar
            dataKey="value"
            fill="var(--cyan)"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ChartCard>

      <ChartCard
        title="Agent Performance"
        subtitle="Dynamic AI quality metrics"
      >
        <RadarChart
          data={agentPerformance}
          outerRadius={75}
        >
          <PolarGrid />

          <PolarAngleAxis dataKey="metric" />

          <Tooltip contentStyle={tooltipStyle} />

          <Radar
            dataKey="value"
            stroke="var(--purple)"
            fill="var(--purple)"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ChartCard>

    </div>
  )
}