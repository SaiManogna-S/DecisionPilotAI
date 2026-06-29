'use client'

import { Card } from '@/components/ui/card'

interface Props {
  context?: any
  previousMeeting?: any
  knowledge?: any
  explanation?: any
}

export function EvidencePanel({
  context,
  previousMeeting,
  knowledge,
  explanation,
}: Props) {
  return (
    <Card className="border-border glass p-5">
      <h3 className="mb-1 text-sm font-semibold">
        Evidence Trail
      </h3>

      <p className="mb-4 text-xs text-muted-foreground">
        Grounded sources behind every recommendation
      </p>

      <div className="grid gap-4">

        {/* Context Agent */}
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <h4 className="mb-2 font-semibold text-cyan">
            Context Agent
          </h4>

          <pre className="whitespace-pre-wrap break-words text-sm leading-7">
            {JSON.stringify(context, null, 2)}
          </pre>
        </div>

        {/* Memory Agent */}
        {/* Memory Agent */}
          <div className="rounded-xl border border-border bg-card/60 p-4">

  <h4 className="mb-4 font-semibold text-green-400">
    Memory Agent
  </h4>

  {previousMeeting ? (

    <div className="space-y-3 text-sm">

      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Previous Health
        </span>

        <span className="font-semibold">
          {previousMeeting.health_score}/100
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Sentiment
        </span>

        <span className="font-semibold capitalize">
          {previousMeeting.sentiment}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Renewal
        </span>

        <span className="font-semibold">
          {previousMeeting.renewal_days} Days
        </span>
      </div>

      <div>

        <p className="mb-2 text-muted-foreground">
          Previous Summary
        </p>

        <div className="rounded-lg bg-background/40 p-3 text-sm">
          {previousMeeting.summary}
        </div>

      </div>

    </div>

  ) : (

    <p className="text-sm text-muted-foreground">
      No previous meeting found.
    </p>

  )}

</div>

        {/* Knowledge Agent */}
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <h4 className="mb-2 font-semibold text-blue-400">
            Knowledge Agent
          </h4>

          <pre className="whitespace-pre-wrap break-words text-sm leading-7">
            {JSON.stringify(knowledge, null, 2)}
          </pre>
        </div>

        {/* Explanation Agent */}
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <h4 className="mb-2 font-semibold text-purple-400">
            Explanation Agent
          </h4>

          {explanation ? (
            <pre className="whitespace-pre-wrap break-words text-sm leading-7">
              {JSON.stringify(explanation, null, 2)}
            </pre>
          ) : (
            <p className="text-sm text-muted-foreground">
              No explanation generated.
            </p>
          )}
        </div>

      </div>
    </Card>
  )
}