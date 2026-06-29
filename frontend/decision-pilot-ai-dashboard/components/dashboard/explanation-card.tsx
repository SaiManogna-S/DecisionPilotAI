'use client'

import { Card } from '@/components/ui/card'

interface Props {
  explanation?: any
}

export function ExplanationCard({ explanation }: Props) {
  if (!explanation) return null

  return (
    <Card className="border-border glass p-5">
      <h3 className="text-lg font-semibold">
        AI Decision Explanation
      </h3>

      <p className="mt-2 text-muted-foreground">
        {explanation.summary}
      </p>

      <div className="mt-6">
        <h4 className="font-semibold mb-2">
          Key Factors
        </h4>

        <ul className="list-disc ml-6 space-y-2">
          {explanation.key_factors?.map(
            (factor: string, index: number) => (
              <li key={index}>{factor}</li>
            )
          )}
        </ul>
      </div>

      <div className="mt-8">
        <h4 className="font-semibold mb-4">
          Why these recommendations?
        </h4>

        <div className="space-y-4">
          {explanation.recommendation_explanation?.map(
            (item: any, index: number) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card/60 p-4"
              >
                <p className="font-semibold">
                  {item.recommendation}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  {item.explanation}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </Card>
  )
}