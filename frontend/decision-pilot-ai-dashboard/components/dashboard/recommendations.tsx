'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'

interface Recommendation {
  priority: string
  title: string
  description: string
  impact: string
  confidence: number
}

interface Props {
  recommendations?: Recommendation[]
}

export function Recommendations({
  recommendations = [],
}: Props) {
  const [status, setStatus] = useState<Record<number, string>>({})

  return (
    <Card className="border-border glass p-5">
      <h3 className="text-sm font-semibold">
        Business Recommendations
      </h3>

      <p className="mb-4 text-xs text-muted-foreground">
        AI Generated Next Best Actions
      </p>

      <div className="space-y-4">

        {recommendations.length === 0 && (
          <div>No recommendations available.</div>
        )}

        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-card/60 p-4"
          >
            <div className="flex items-center justify-between">

              <span className="rounded-full bg-red-600/20 px-3 py-1 text-sm font-semibold text-red-400">
                {rec.priority}
              </span>

              <span className="text-xs text-cyan-400">
                {rec.confidence}% confidence
              </span>

            </div>

            <h4 className="mt-3 text-lg font-semibold">
              {rec.title}
            </h4>

            <p className="mt-2 text-sm text-muted-foreground">
              {rec.description}
            </p>

            <div className="mt-3 rounded-lg bg-primary/10 p-3 text-sm">
              <strong>Business Impact:</strong>
              <br />
              {rec.impact}
            </div>

            <div className="mt-4 flex gap-3">

              <button
                onClick={() =>
                  setStatus((prev) => ({
                    ...prev,
                    [index]: 'Approved',
                  }))
                }
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                ✓ Approve
              </button>

              <button
                onClick={() =>
                  setStatus((prev) => ({
                    ...prev,
                    [index]: 'Rejected',
                  }))
                }
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                ✕ Reject
              </button>

            </div>

            {status[index] && (
              <div
                className={`mt-3 rounded-lg p-2 text-sm font-medium ${
                  status[index] === 'Approved'
                    ? 'bg-green-600/20 text-green-400'
                    : 'bg-red-600/20 text-red-400'
                }`}
              >
                Human Decision: {status[index]}
              </div>
            )}

          </div>
        ))}

      </div>
    </Card>
  )
}