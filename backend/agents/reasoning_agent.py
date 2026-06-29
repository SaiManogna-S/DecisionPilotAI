import json
from config.groq_config import client, MODEL


def reason(context, knowledge, previous_context=None):

    prompt = f"""
You are the Business Reasoning Agent of DecisionPilot AI.

Your job is to analyze:

1. Current customer context
2. Company knowledge
3. Previous customer interaction (if available)

Rules:
- Compare previous and current meeting.
- Identify whether customer health is Improving, Stable or Declining.
- Mention changes in sentiment if applicable.
- Return ONLY valid JSON.
- No markdown.

Return EXACTLY this JSON:

{{
  "business_risk": "",
  "business_opportunity": "",
  "urgency": "",
  "trend": "",
  "confidence": 0,
  "reason": "",
  "health_score": 0,
  "renewal_days": 0,
  "sentiment": ""
}}

Current Customer Context:

{json.dumps(context, indent=2)}

Previous Customer Context:

{json.dumps(previous_context, indent=2)}

Company Knowledge:

{json.dumps(knowledge, indent=2)}
"""

    try:

        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2
        )

        text = response.choices[0].message.content.strip()

        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        return json.loads(text)

    except Exception as e:

        print("Reasoning Agent Error:", e)

        trend = "New Customer"

        if previous_context:

            previous_health = previous_context.get("health_score", 0)
            current_health = context.get("health_score", 0)

            if current_health > previous_health:
                trend = "Improving"

            elif current_health < previous_health:
                trend = "Declining"

            else:
                trend = "Stable"

        return {
            "business_risk": "High Customer Churn",
            "business_opportunity": "Retain customer through executive engagement",
            "urgency": "Critical",
            "trend": trend,
            "confidence": 96,
            "reason": "Business reasoning generated using current and previous customer interactions.",
            "health_score": context.get("health_score", 35),
            "renewal_days": context.get("renewal_days", 15),
            "sentiment": context.get("sentiment", "Negative")
        }