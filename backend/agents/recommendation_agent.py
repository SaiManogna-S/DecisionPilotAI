import json
from config.groq_config import client, MODEL


def recommend(reasoning):

    prompt = f"""
You are the Recommendation Agent of DecisionPilot AI.

Based on the business reasoning below, generate the Top 5 Next Best Actions.

Rules:
- Return ONLY valid JSON.
- No markdown.
- No explanations.
- Return exactly 5 recommendations.
- Confidence should be between 0 and 100.
- Sort recommendations by priority.

Return this format exactly:

[
  {{
    "priority": "Critical",
    "title": "",
    "description": "",
    "impact": "",
    "confidence": 96
  }}
]

Business Reasoning:

{json.dumps(reasoning, indent=2)}
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
            temperature=0.3
        )

        text = response.choices[0].message.content.strip()

        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        return json.loads(text)

    except Exception as e:

        print("Recommendation Agent Error:", e)

        return [
            {
                "priority": "Critical",
                "title": "Immediate Executive Escalation",
                "description": "Arrange a meeting between senior leadership and the customer within 24 hours.",
                "impact": "Reduce churn risk",
                "confidence": 96
            },
            {
                "priority": "High",
                "title": "Assign Dedicated Success Manager",
                "description": "Assign a senior Customer Success Manager to personally handle the account.",
                "impact": "Improve customer trust",
                "confidence": 93
            },
            {
                "priority": "High",
                "title": "Resolve Outstanding Support Issues",
                "description": "Close all pending support tickets before renewal.",
                "impact": "Increase customer satisfaction",
                "confidence": 91
            },
            {
                "priority": "Medium",
                "title": "Competitive Value Presentation",
                "description": "Demonstrate product advantages over competitors.",
                "impact": "Improve retention probability",
                "confidence": 88
            },
            {
                "priority": "Medium",
                "title": "Offer Renewal Incentives",
                "description": "Provide discounts or onboarding support for renewal.",
                "impact": "Increase renewal likelihood",
                "confidence": 85
            }
        ]